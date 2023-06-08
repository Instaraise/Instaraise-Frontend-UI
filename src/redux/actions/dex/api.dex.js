import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { TezosMessageUtils, TezosParameterFormat } from 'conseiljs';

import { getInstaPrice } from './action.liquidity';
import {
    DATA_URL,
    DEX_ADDRESS,
    DEX_FEE,
    DEX_NETWORK,
    RPC_NODES,
} from '../../../config/config';
import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import { CONTRACT_CONFIG } from '../../../config/network.config';

export const getPackedKey = (tokenId, address, type) => {
    const accountHex = `0x${TezosMessageUtils.writeAddress(address)}`;
    let packedKey = null;
    if (type === 'FA2') {
        packedKey = TezosMessageUtils.encodeBigMapKey(
            Buffer.from(
                TezosMessageUtils.writePackedData(
                    `(Pair ${accountHex} ${tokenId})`,
                    '',
                    TezosParameterFormat.Michelson
                ),
                'hex'
            )
        );
    } else {
        packedKey = TezosMessageUtils.encodeBigMapKey(
            Buffer.from(
                TezosMessageUtils.writePackedData(
                    `${accountHex}`,
                    '',
                    TezosParameterFormat.Michelson
                ),
                'hex'
            )
        );
    }
    return packedKey;
};
export const fetchTokenStats = async () => {
    try {
        const response = await axios.get(`${DATA_URL}/v1/tokens`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            data: {
                token_name: null,
                price: null,
                change: null,
                volume: null,
                liquidity: null,
                graph_data: null,
            },
            error: error,
        };
    }
};

export const getBalance = async (tokenId, tokenType, NETWORK, decimal) => {
    try {
        if (!tokenType) {
            throw new Error('No token type passed');
        }
        const big_map_key =
            tokenType !== 'FA2'
                ? CONTRACT_CONFIG[DEX_NETWORK].BIG_MAP_FA1
                : CONTRACT_CONFIG[DEX_NETWORK].BIG_MAP_FA2;
        const wallet = new BeaconWallet({ name: NETWORK });
        let account = await wallet.client.getActiveAccount();
        let balance;
        const packedKey = getPackedKey(tokenId, account.address, tokenType);
        const connectedNetwork = NETWORK;
        const rpcNode = RPC_NODES[connectedNetwork];
        const url = `${rpcNode}/chains/main/blocks/head/context/big_maps/${big_map_key}/${packedKey}
        `;

        const response = await axios.get(url);
        balance =
            tokenType !== 'FA2'
                ? Number(response.data.args[1].int)
                : Number(response.data.int);
        balance = balance / Math.pow(10, Number(decimal));
        return balance.PrecisionMaker(2);
    } catch (error) {
        return 0;
    }
};
export const fetchPrice = async (data) => {
    try {
        const price = await getInstaPrice();
        const NETWORK = data.selectedNetwork.toLowerCase();
        if (data.DEX_TO_ADDRESS === 'INSTA') {
            const response = await SourceToInstaPrice(
                data.DEX_FROM_ADDRESS,
                data.number,
                data.token1,
                NETWORK
            );
            return {
                success: true,
                value: {
                    [data.token1]: response.price_In_INSTA,
                    [data.token2]: response.price_In_BASE,
                    [`${data.token1}_in_dollars`]:
                        response.price_In_INSTA * price,
                    rate: response.IN_TERMS_OF_ONE.insta,
                },
            };
        } else if (data.DEX_FROM_ADDRESS === 'INSTA') {
            const response = await SourceToInstaPrice(
                data.DEX_TO_ADDRESS,
                data.number,
                data.token2,
                NETWORK
            );
            return {
                success: true,
                value: {
                    [data.token1]: response.price_In_BASE,
                    [data.token2]: response.price_In_INSTA,
                    [`${data.token1}_in_dollars`]:
                        response.price_In_INSTA * price,
                    rate: response.IN_TERMS_OF_ONE.base,
                },
            };
        } else {
            const fromPrice = await SourceToInstaPrice(
                data.DEX_FROM_ADDRESS,
                data.number,
                data.token1,
                NETWORK
            );
            const toPrice = await SourceToInstaPrice(
                data.DEX_TO_ADDRESS,
                fromPrice.price_In_INSTA,
                data.token2,
                NETWORK
            );
            const response = await Promise.all([fromPrice, toPrice]);
            const response1 = response.filter(
                (res) => res.tokenName === data.token1
            )[0];
            const response2 = response.filter(
                (res) => res.tokenName === data.token2
            )[0];
            return {
                success: true,
                value: {
                    [response1.tokenName]: response1.price_In_INSTA,
                    [response2.tokenName]: new BigNumber(
                        response2.price_In_BASE
                    ).multipliedBy(1 - new BigNumber(DEX_FEE).dividedBy(100)),
                    [`${data.token1}_in_dollars`]:
                        price * response1.price_In_INSTA,
                    rate: new BigNumber(response1.IN_TERMS_OF_ONE.insta)
                        .dividedBy(
                            new BigNumber(response2.IN_TERMS_OF_ONE.insta)
                        )
                        .toNumber(),
                },
            };
        }
    } catch (error) {
        return {
            success: false,
            value: {
                [data.token1]: 0,
                [data.token2]: 0,
            },
        };
    }
};
export const SourceToInstaPrice = async (
    sourceAddress,
    amount,
    tokenName,
    NETWORK
) => {
    try {
        const RPC_RESPONSE = await axios.get(
            `${
                RPC_NODES[NETWORK.toLowerCase()]
            }/chains/main/blocks/head/context/contracts/${sourceAddress}/storage`
        );
        const networkToken = RPC_RESPONSE.data.args[3][0].args[1].args[0].args;
        const sourceToken = RPC_RESPONSE.data.args[3][1].args[1].args[0].args;
        const sourceDecimals =
            Math.pow(10, 18) / RPC_RESPONSE.data.args[3][1].args[1].args[1].int;
        const instaDecimals =
            Math.pow(10, 18) / RPC_RESPONSE.data.args[3][0].args[1].args[1].int;

        const INSTA = new BigNumber(networkToken[1].int)
            .dividedBy(instaDecimals)
            .multipliedBy(new BigNumber(amount)) // it requires amount in tokens
            .dividedBy(
                new BigNumber(sourceToken[1].int)
                    .dividedBy(sourceDecimals)
                    .plus(new BigNumber(amount))
            )
            .toNumber();

        const BASE_TOKEN = new BigNumber(sourceToken[1].int)
            .dividedBy(sourceDecimals)
            .multipliedBy(new BigNumber(amount))
            .dividedBy(
                new BigNumber(networkToken[1].int)
                    .dividedBy(instaDecimals)
                    .plus(new BigNumber(amount))
            )
            .toNumber();

        const INSTA_IN_TERMS_OF_ONE = new BigNumber(networkToken[1].int)
            .dividedBy(instaDecimals)
            .multipliedBy(1)
            .dividedBy(
                new BigNumber(sourceToken[1].int)
                    .dividedBy(sourceDecimals)
                    .plus(1)
            )
            .toNumber();

        const BASE_TOKEN_IN_TERMS_OF_ONE = new BigNumber(sourceToken[1].int)
            .dividedBy(sourceDecimals)
            .multipliedBy(1)
            .dividedBy(
                new BigNumber(networkToken[1].int)
                    .dividedBy(instaDecimals)
                    .plus(1)
            )
            .toNumber();
        return {
            status: true,
            tokenName: tokenName,
            price_In_INSTA: INSTA,
            price_In_BASE: BASE_TOKEN,
            IN_TERMS_OF_ONE: {
                insta: INSTA_IN_TERMS_OF_ONE,
                base: BASE_TOKEN_IN_TERMS_OF_ONE,
            },
        };
    } catch (error) {
        return {
            status: false,
            tokenName: null,
            price_In_INSTA: 0,
            price_In_BASE: 0,
            IN_TERMS_OF_ONE: {
                insta: 0,
                base: 0,
            },
        };
    }
};
export const convertTokenAPI = async (args) => {
    try {
        const sourceId = args.sourceTokenId;
        const destinationId = args.destinationTokenId;
        const sourceDecimal = args.sourceDecimals;
        const destinationDecimal = args.destinationDecimals;
        const sourceTokenId = args.sourceTokenId;
        const destinationTokenId = args.destinationTokenId;
        const NETWORK = args.selectedNetwork.toLowerCase();
        const source = args.source;
        const destination = args.destination;
        const DEX_SOURCE_ADDRESS = args.dexSourceAddress;
        const DEX_DESTINATION_ADDRESS = args.dexDestinationAddress;
        const options = {
            name: NETWORK,
        };
        const connectedNetwork = NETWORK.toLowerCase();
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        if (account.network.type === 'mainnet') {
            await wallet.client.requestPermissions({
                network: {
                    type: NETWORK === 'testnet' ? DEX_NETWORK : 'mainnet',
                },
            });
            account = await wallet.client.getActiveAccount();
        }
        if (source !== 'insta' && destination === 'insta') {
            const response = await networkTokenSwap(
                destination,
                source,
                connectedNetwork,
                wallet,
                args.amount,
                sourceDecimal,
                destinationDecimal,
                sourceTokenId,
                account,
                DEX_SOURCE_ADDRESS,
                '1',
                '0',
                args.slippage,
                args.sourceTokenType,
                args.destinationTokenType,
                args.sourceTokenAddress,
                args.destinationTokenAddress
            );
            if (response.status) {
                return {
                    status: true,
                    operationId: response.operationId,
                };
            } else {
                return {
                    status: false,
                    operationId: null,
                };
            }
        } else if (source === 'insta' && destination !== 'insta') {
            const response = await networkTokenSwap(
                destination,
                source,
                connectedNetwork,
                wallet,
                args.amount,
                sourceDecimal,
                destinationDecimal,
                sourceTokenId,
                account,
                DEX_DESTINATION_ADDRESS,
                '0',
                '1',
                args.slippage,
                args.sourceTokenType,
                args.destinationTokenType,
                args.sourceTokenAddress,
                args.destinationTokenAddress
            );
            if (response.status) {
                return {
                    status: true,
                    operationId: response.operationId,
                };
            } else {
                return {
                    status: false,
                    operationId: null,
                };
            }
        } else if (source !== 'insta' && destination !== 'insta') {
            const response = await tokenSwap(
                source,
                destination,
                connectedNetwork,
                wallet,
                args.amount,
                sourceDecimal,
                destinationDecimal,
                sourceTokenId,
                destinationTokenId,
                account,
                DEX_SOURCE_ADDRESS,
                DEX_DESTINATION_ADDRESS,
                sourceId,
                destinationId,
                args.slippage,
                args.sourceTokenType,
                args.destinationTokenType,
                args.sourceTokenAddress,
                args.destinationTokenAddress
            );
            if (response.status) {
                return {
                    status: true,
                    operationId: response.operationId,
                };
            } else {
                return {
                    status: false,
                    operationId: null,
                };
            }
        }
    } catch (error) {
        return {
            status: false,
            operationId: null,
        };
    }
};

export const networkTokenSwap = async (
    destinationTokenName,
    sourceTokenName,
    connectedNetwork,
    wallet,
    amount,
    sourceDecimal,
    destinationDecimal,
    tokenId,
    account,
    DEX_ADDRESS,
    sourceId,
    destinationId,
    slippage,
    sourceTokenType,
    destinationTokenType,
    sourceTokenAddress
) => {
    try {
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstance = await Tezos.wallet.at(DEX_ADDRESS);
        const tokenContractInstance = await Tezos.wallet.at(sourceTokenAddress);
        const tokenAmount = new BigNumber(amount)
            .multipliedBy(Math.pow(10, sourceDecimal))
            .integerValue()
            .toNumber();

        let batch = null;
        const networkSlippage = await calculateSlippage({
            DEX_ADDRESS: DEX_ADDRESS,
            sourceTokenName: sourceTokenName,
            destinationTokenName: destinationTokenName,
            destinationDecimal: destinationDecimal,
            connectedNetwork: connectedNetwork,
            slippage: slippage,
            amount: amount,
        });
        if (sourceTokenType === 'FA2') {
            batch = Tezos.wallet
                .batch()
                .withContractCall(
                    tokenContractInstance.methods.update_operators([
                        {
                            add_operator: {
                                owner: account.address,
                                operator: DEX_ADDRESS,
                                token_id: tokenId,
                            },
                        },
                    ])
                )
                .withContractCall(
                    poolContractInstance.methods.convert(
                        tokenAmount,
                        networkSlippage,
                        sourceId,
                        destinationId
                    )
                )
                .withContractCall(
                    tokenContractInstance.methods.update_operators([
                        {
                            remove_operator: {
                                owner: account.address,
                                operator: DEX_ADDRESS,
                                token_id: tokenId,
                            },
                        },
                    ])
                );
        } else {
            batch = Tezos.wallet
                .batch()
                .withContractCall(
                    tokenContractInstance.methods.approve(DEX_ADDRESS, 0)
                )
                .withContractCall(
                    tokenContractInstance.methods.approve(
                        DEX_ADDRESS,
                        tokenAmount
                    )
                )
                .withContractCall(
                    /**
                     * # Format
                     * parameter pair
                        amount nat
                        minReturn nat
                        sourceId nat
                        targetId nat
                     */
                    // poolContractInstance.methods.convert(1, 0, tokenAmount, 1)
                    poolContractInstance.methods.convert(
                        tokenAmount,
                        networkSlippage,
                        1,
                        0
                    )
                );
        }

        const batchOperation = await batch.send();
        const response = await batchOperation
            .confirmation()
            .then(() => batchOperation.opHash);
        return {
            status: true,
            operationId: response,
        };
    } catch (error) {
        return {
            status: false,
            operationId: null,
        };
    }
};
export const tokenSwap = async (
    sourceName,
    destinationName,
    connectedNetwork,
    wallet,
    amount,
    sourceDecimal,
    destinationDecimal,
    sourceTokenId,
    destinationTokenId,
    account,
    DEX_SOURCE_ADDRESS,
    DEX_DESTINATION_ADDRESS,
    sourceId,
    destinationId,
    slippage,
    sourceTokenType,
    destinationTokenType,
    sourceTokenAddress,
    destinationTokenAddress
) => {
    try {
        const fromPrice = await SourceToInstaPrice(
            DEX_SOURCE_ADDRESS,
            amount,
            sourceName,
            connectedNetwork.toLowerCase()
        );
        let number_of_insta_tokens_received = new BigNumber(
            fromPrice.price_In_INSTA
        ).multipliedBy(new BigNumber('1000000000'));
        number_of_insta_tokens_received =
            number_of_insta_tokens_received.multipliedBy(
                new BigNumber(1 - new BigNumber(DEX_FEE).dividedBy(100))
            );
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstanceSource = await Tezos.wallet.at(
            DEX_SOURCE_ADDRESS
        );
        const poolContractInstanceDestination = await Tezos.wallet.at(
            DEX_DESTINATION_ADDRESS
        );
        const sourceTokenContractInstance = await Tezos.wallet.at(
            sourceTokenAddress
        );
        const destinationTokenContractInstance = await Tezos.wallet.at(
            destinationTokenAddress
        );
        const tokenAmountSource = amount * Math.pow(10, sourceDecimal);
        let batch = null;
        let baseSlippage = await calculateSlippage({
            DEX_ADDRESS: DEX_SOURCE_ADDRESS,
            connectedNetwork: connectedNetwork,
            slippage: slippage,
            amount: amount,
            sourceTokenName: sourceName,
            destinationTokenName: 'insta',
            destinationDecimal: 9,
        });
        let networkSlippage = await calculateSlippage({
            DEX_ADDRESS: DEX_DESTINATION_ADDRESS,
            connectedNetwork: connectedNetwork,
            slippage: slippage,
            amount: amount,
            sourceTokenName: 'insta',
            destinationTokenName: destinationName,
            destinationDecimal: destinationDecimal,
        });
        if (sourceTokenType === 'FA2' && destinationTokenType === 'FA2') {
            batch = Tezos.wallet
                .batch()
                .withContractCall(
                    sourceTokenContractInstance.methods.update_operators([
                        {
                            add_operator: {
                                owner: account.address,
                                operator: DEX_SOURCE_ADDRESS,
                                token_id: sourceTokenId,
                            },
                        },
                    ])
                )
                .withContractCall(
                    poolContractInstanceSource.methods.convert(
                        tokenAmountSource,
                        baseSlippage,
                        '1',
                        '0'
                    )
                )
                .withContractCall(
                    sourceTokenContractInstance.methods.update_operators([
                        {
                            remove_operator: {
                                owner: account.address,
                                operator: DEX_SOURCE_ADDRESS,
                                token_id: sourceTokenId,
                            },
                        },
                    ])
                )
                .withContractCall(
                    destinationTokenContractInstance.methods.update_operators([
                        {
                            add_operator: {
                                owner: account.address,
                                operator: DEX_DESTINATION_ADDRESS,
                                token_id: 0,
                            },
                        },
                    ])
                )
                .withContractCall(
                    poolContractInstanceDestination.methods.convert(
                        number_of_insta_tokens_received.toNumber().toFixed(0),
                        networkSlippage,
                        '0',
                        '1'
                    )
                )
                .withContractCall(
                    destinationTokenContractInstance.methods.update_operators([
                        {
                            remove_operator: {
                                owner: account.address,
                                operator: DEX_DESTINATION_ADDRESS,
                                token_id: 0,
                            },
                        },
                    ])
                );
        } else if (
            sourceTokenType === 'Fa1.2' &&
            destinationTokenType === 'FA2'
        ) {
            batch = Tezos.wallet
                .batch()
                .withContractCall(
                    sourceTokenContractInstance.methods.approve(
                        DEX_SOURCE_ADDRESS,
                        0
                    )
                )
                .withContractCall(
                    sourceTokenContractInstance.methods.approve(
                        DEX_SOURCE_ADDRESS,
                        tokenAmountSource
                    )
                )
                .withContractCall(
                    /**
                     * # Format
                     * parameter pair
                        amount nat
                        minReturn nat
                        sourceId nat
                        targetId nat
                     */
                    // poolContractInstance.methods.convert(1, 0, tokenAmount, 1)
                    poolContractInstanceSource.methods.convert(
                        tokenAmountSource,
                        baseSlippage,
                        1,
                        0
                    )
                )
                .withContractCall(
                    destinationTokenContractInstance.methods.update_operators([
                        {
                            add_operator: {
                                owner: account.address,
                                operator: DEX_DESTINATION_ADDRESS,
                                token_id: 0,
                            },
                        },
                    ])
                )
                .withContractCall(
                    poolContractInstanceDestination.methods.convert(
                        number_of_insta_tokens_received.toNumber().toFixed(0),
                        networkSlippage,
                        '0',
                        '1'
                    )
                )
                .withContractCall(
                    destinationTokenContractInstance.methods.update_operators([
                        {
                            remove_operator: {
                                owner: account.address,
                                operator: DEX_DESTINATION_ADDRESS,
                                token_id: 0,
                            },
                        },
                    ])
                );
        } else if (
            sourceTokenType === 'FA2' &&
            destinationTokenType === 'Fa1.2'
        ) {
            batch = Tezos.wallet
                .batch()
                .withContractCall(
                    sourceTokenContractInstance.methods.update_operators([
                        {
                            add_operator: {
                                owner: account.address,
                                operator: DEX_SOURCE_ADDRESS,
                                token_id: sourceTokenId,
                            },
                        },
                    ])
                )
                .withContractCall(
                    poolContractInstanceSource.methods.convert(
                        tokenAmountSource,
                        baseSlippage,
                        '1',
                        '0'
                    )
                )
                .withContractCall(
                    sourceTokenContractInstance.methods.update_operators([
                        {
                            remove_operator: {
                                owner: account.address,
                                operator: DEX_SOURCE_ADDRESS,
                                token_id: sourceTokenId,
                            },
                        },
                    ])
                )
                .withContractCall(
                    sourceTokenContractInstance.methods.update_operators([
                        {
                            add_operator: {
                                owner: account.address,
                                operator: DEX_DESTINATION_ADDRESS,
                                token_id: 0,
                            },
                        },
                    ])
                )
                .withContractCall(
                    poolContractInstanceDestination.methods.convert(
                        number_of_insta_tokens_received.toNumber().toFixed(0),
                        networkSlippage,
                        '0',
                        '1'
                    )
                )
                .withContractCall(
                    sourceTokenContractInstance.methods.update_operators([
                        {
                            remove_operator: {
                                owner: account.address,
                                operator: DEX_DESTINATION_ADDRESS,
                                token_id: 0,
                            },
                        },
                    ])
                );
        }

        const batchOperation = await batch.send();
        const response = await batchOperation
            .confirmation()
            .then(() => batchOperation.opHash);
        return {
            status: true,
            operationId: response,
        };
    } catch (error) {
        return {
            status: false,
            operationId: null,
        };
    }
};
export const calculateSlippage = async ({
    DEX_ADDRESS,
    sourceTokenName,
    destinationTokenName,
    connectedNetwork,
    destinationDecimal,
    slippage,
    amount,
}) => {
    try {
        const tokenPrice = await SourceToInstaPrice(
            DEX_ADDRESS,
            amount,
            destinationTokenName === 'insta'
                ? sourceTokenName
                : destinationTokenName,
            connectedNetwork
        );
        let networkSlippage = new BigNumber(
            destinationTokenName === 'insta'
                ? tokenPrice.price_In_INSTA
                : tokenPrice.price_In_BASE
        ).multipliedBy(
            destinationTokenName === 'insta'
                ? new BigNumber(1000000000)
                : new BigNumber(Math.pow(10, destinationDecimal))
        );
        networkSlippage = new BigNumber(networkSlippage)
            .multipliedBy(
                new BigNumber(1 - new BigNumber(DEX_FEE).dividedBy(100))
            )
            .multipliedBy(1 - new BigNumber(slippage).dividedBy(100))
            .toFixed(0)
            .toString();
        return networkSlippage;
    } catch (error) {
        return 1;
    }
};
const fetchTokenStorage = async ({ DEX_ADDRESS }) => {
    try {
        const NETWORK = 'testnet';
        const RPC_RESPONSE = await axios.get(
            `${
                RPC_NODES[NETWORK.toLowerCase()]
            }/chains/main/blocks/head/context/contracts/${DEX_ADDRESS}/storage`
        );
        const sourceTokenBalance =
            RPC_RESPONSE.data.args[3][1].args[1].args[0].args[1].int;
        const networkTokenBalance =
            RPC_RESPONSE.data.args[3][0].args[1].args[0].args[1].int;

        const sourceDecimals =
            Math.pow(10, 18) / RPC_RESPONSE.data.args[3][1].args[1].args[1].int;
        const instaDecimals =
            Math.pow(10, 18) / RPC_RESPONSE.data.args[3][0].args[1].args[1].int;
        return {
            success: true,
            sourceTokenBalance:
                parseInt(sourceTokenBalance) / parseInt(sourceDecimals),
            networkTokenBalance:
                parseInt(networkTokenBalance) / parseInt(instaDecimals),
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            sourceTokenBalance: 0,
            networkTokenBalance: 0,
        };
    }
};
export const fetchPriceImpact = async ({
    DEX_FROM_ADDRESS,
    DEX_TO_ADDRESS,
    tokenAmount,
}) => {
    try {
        if (DEX_TO_ADDRESS === 'INSTA' || DEX_FROM_ADDRESS === 'INSTA') {
            const { sourceTokenBalance, networkTokenBalance } =
                await fetchTokenStorage({
                    DEX_ADDRESS:
                        DEX_FROM_ADDRESS === 'INSTA'
                            ? DEX_TO_ADDRESS
                            : DEX_FROM_ADDRESS,
                });
            const initialPrice = sourceTokenBalance / networkTokenBalance;
            const outToken = initialPrice * parseInt(tokenAmount);
            const finalPrice =
                (sourceTokenBalance + outToken) /
                (networkTokenBalance - parseInt(tokenAmount));
            const change = Math.abs(
                ((initialPrice - finalPrice) / initialPrice) * 100
            ).PrecisionMaker(5);
            return {
                success: true,
                value: change,
            };
        }
        const result = await Promise.all([
            await fetchTokenStorage({
                DEX_ADDRESS: DEX_FROM_ADDRESS,
            }),
            await fetchTokenStorage({
                DEX_ADDRESS: DEX_TO_ADDRESS,
            }),
        ]);
        const token1Storage = result[0];
        const token2Storage = result[1];
        //initialPrice in uUSD-INSTA pool = no. of insta / no. of uUSD

        //initialPrice in PLENTY-INSTA pool = no. of insta / no. of PLENTY

        //initial price (for uUSD->PLENTY) = initialPrice in uUSD-INSTA pool / initialPrice in PLENTY-INSTA pool
        const initialPricePool1 =
            token1Storage.networkTokenBalance /
            token1Storage.sourceTokenBalance;
        const initialPricePool2 =
            token2Storage.networkTokenBalance /
            token2Storage.sourceTokenBalance;
        const initialPrice = initialPricePool1 / initialPricePool2;
        const outToken = initialPrice * parseInt(tokenAmount);
        const finalPrice =
            (token1Storage.sourceTokenBalance + outToken) /
            (token2Storage.sourceTokenBalance - parseInt(tokenAmount));
        const change = Math.abs(
            ((initialPrice - finalPrice) / initialPrice) * 100
        );
        return {
            success: true,
            value: change.PrecisionMaker(3),
        };
    } catch (error) {
        return {
            success: false,
            value: 0,
        };
    }
};
export const mintTokens = async (args) => {
    try {
        const NETWORK = args.network.toLowerCase();
        const options = {
            name: NETWORK,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        if (account.network.type === 'mainnet') {
            await wallet.client.requestPermissions({
                network: {
                    type: NETWORK === 'testnet' ? DEX_NETWORK : 'mainnet',
                },
            });
            account = await wallet.client.getActiveAccount();
        }
        const Tezos = new TezosToolkit(RPC_NODES[NETWORK]);
        Tezos.setRpcProvider(RPC_NODES[NETWORK]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstanceFA2 = await Tezos.wallet.at(DEX_ADDRESS);
        const tokenAddress = DEX_TOKEN_CONFIG.filter(
            (item) => item.TOKEN_TYPE !== 'FA2'
        )[0].TOKEN_ADDRESS;
        const poolContractInstanceFA12 = await Tezos.wallet.at(tokenAddress);
        let batch = null;
        batch = Tezos.wallet
            .batch()
            .withContractCall(poolContractInstanceFA2.methods.mint_tokens(0))
            .withContractCall(poolContractInstanceFA2.methods.mint_tokens(1))
            .withContractCall(poolContractInstanceFA2.methods.mint_tokens(2))
            .withContractCall(poolContractInstanceFA2.methods.mint_tokens(3))
            .withContractCall(poolContractInstanceFA2.methods.mint_tokens(4))
            .withContractCall(poolContractInstanceFA2.methods.mint_tokens(5))
            .withContractCall(poolContractInstanceFA12.methods.mint_tokens(0));

        const batchOperation = await batch.send();
        const response = await batchOperation
            .confirmation()
            .then(() => batchOperation.opHash);
        return {
            status: true,
            operationId: response,
        };
    } catch (error) {
        console.log(error);

        return {
            status: false,
            operationId: null,
        };
    }
};
