import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import CoinGecko from 'coingecko-api';

import { SourceToInstaPrice } from './api.dex';
import {
    LIQUIDITY_DATA_API_URL,
    RPC_NODES,
    TZKT_NODES,
} from '../../../config/config';
import { DEX_NETWORK } from '../../../config/config';
import { DEX_LIQUIDITY_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';
import { CONTRACT_CONFIG } from '../../../config/network.config';

const coingecko = new CoinGecko();
export const fetchPoolStats = async () => {
    try {
        const response = await axios.get(LIQUIDITY_DATA_API_URL);
        return response.data;
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error,
        };
    }
};
export const addLiquidity = async (args) => {
    try {
        const NETWORK = args.selectedNetwork.toLowerCase();
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
        if (args.token === 'Insta') {
            return addNetworkTokenLiquidity(
                NETWORK,
                wallet,
                args.amount,
                args.decimals,
                args.tokenId,
                account,
                args.dexAddress,
                args.tokenAddress,
                args.tokenType
            );
        } else {
            return addBaseTokenLiquidity(
                NETWORK,
                wallet,
                args.amount,
                args.decimals,
                args.tokenId,
                account,
                args.dexAddress,
                args.tokenAddress,
                args.tokenType
            );
        }
    } catch (error) {
        return {
            success: false,
            operationId: null,
        };
    }
};
export const addNetworkTokenLiquidity = async (
    connectedNetwork,
    wallet,
    amount,
    decimal,
    tokenId,
    account,
    DEX_ADDRESS
) => {
    try {
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstance = await Tezos.wallet.at(DEX_ADDRESS);
        const tokenContractInstance = await Tezos.wallet.at(
            CONTRACT_CONFIG[DEX_NETWORK].TOKEN_ADDRESS
        );
        const tokenAmount = Number(amount) * Math.pow(10, 9);
        let batch = null;

        batch = Tezos.wallet
            .batch()
            .withContractCall(
                tokenContractInstance.methods.update_operators([
                    {
                        add_operator: {
                            owner: account.address,
                            operator: DEX_ADDRESS,
                            token_id: 0,
                        },
                    },
                ])
            )
            .withContractCall(
                poolContractInstance.methods.addNetworkTokenLiquidity(
                    tokenAmount
                )
            )
            .withContractCall(
                tokenContractInstance.methods.update_operators([
                    {
                        remove_operator: {
                            owner: account.address,
                            operator: DEX_ADDRESS,
                            token_id: 0,
                        },
                    },
                ])
            );

        const batchOperation = await batch.send();
        const response = await batchOperation
            .confirmation()
            .then(() => batchOperation.opHash);
        return {
            success: true,
            operationId: response,
        };
    } catch (error) {
        return {
            success: false,
            operationId: null,
        };
    }
};
export const addBaseTokenLiquidity = async (
    connectedNetwork,
    wallet,
    amount,
    decimal,
    tokenId,
    account,
    DEX_ADDRESS,
    tokenAddress,
    tokenType
) => {
    try {
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstance = await Tezos.wallet.at(DEX_ADDRESS);
        const tokenContractInstance = await Tezos.wallet.at(tokenAddress);

        const tokenAmount = amount * Math.pow(10, decimal);
        let batch = null;
        if (tokenType === 'FA2') {
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
                    poolContractInstance.methods.addBaseTokenLiquidity(
                        tokenAmount
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
                    poolContractInstance.methods.addBaseTokenLiquidity(
                        tokenAmount
                    )
                );
        }

        const batchOperation = await batch.send();
        const response = await batchOperation
            .confirmation()
            .then(() => batchOperation.opHash);
        return {
            success: true,
            operationId: response,
        };
    } catch (error) {
        return {
            success: false,
            operationId: null,
        };
    }
};
export const removeLiquidity = async (args) => {
    try {
        const NETWORK = args.selectedNetwork.toLowerCase();
        const options = {
            name: NETWORK,
        };
        const wallet = new BeaconWallet(options);
        // let account = await wallet.client.getActiveAccount();
        const Tezos = new TezosToolkit(RPC_NODES[NETWORK]);
        Tezos.setRpcProvider(RPC_NODES[NETWORK]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstance = await Tezos.wallet.at(
            args.contractAddress
        );
        // const tokenContractInstance = await Tezos.wallet.at(args.tokenAddress);
        let batch = null;
        batch = Tezos.wallet
            .batch()
            .withContractCall(
                poolContractInstance.methods.removeLiquidityWithProtection(
                    parseInt(1000000 * args.portion),
                    args.positionId
                )
            );

        const batchOperation = await batch.send();
        const response = await batchOperation
            .confirmation()
            .then(() => batchOperation.opHash);

        return {
            success: true,
            operationId: response,
        };
    } catch (error) {
        return {
            success: false,
            operationId: null,
        };
    }
};
export const fetchTokenPrice = async (data) => {
    try {
        // const response = await axios.get(`${HOMESTATS_API_URL}`);
        const price = await getInstaPrice();
        const NETWORK = data.selectedNetwork.toLowerCase();

        if (data.DEX_FROM_ADDRESS === 'INSTA') {
            const response = await SourceToInstaPrice(
                data.DEX_TO_ADDRESS,
                data.number,
                data.token1,
                NETWORK
            );
            return {
                success: true,
                value: {
                    [`${data.token1}_in_dollars`]:
                        (1 / response.IN_TERMS_OF_ONE.insta) * price,
                },
            };
        } else {
            const response = await SourceToInstaPrice(
                data.DEX_FROM_ADDRESS,
                data.number,
                data.token2,
                NETWORK
            );
            return {
                success: true,
                value: {
                    [`${data.token1}_in_dollars`]:
                        response.IN_TERMS_OF_ONE.insta * price,
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
const getTezosPriceInUSD = async () => {
    const data = await coingecko.simple.price({
        ids: 'tezos',
        vs_currencies: 'usd',
    });
    return data.data.tezos.usd;
};
export const getInstaPrice = async () => {
    try {
        const tezosPriceUSD = await getTezosPriceInUSD();
        const CTEZ_CONVERTER = CONTRACT_CONFIG[DEX_NETWORK][5].CONVERTER;
        const ctezContractStorage = await axios.get(
            `${TZKT_NODES.testnet}/v1/contracts/${CTEZ_CONVERTER}/storage`
        );

        const ctezXtzQuipuswapStorage = (
            await axios.get(
                `https://api.tzkt.io/v1/contracts/KT1FbYwEWU8BTfrvNoL5xDEC5owsDxv9nqKT/storage`
            )
        ).data;

        const priceOfOneCtezInXtz = new BigNumber(
            ctezXtzQuipuswapStorage.storage.tez_pool
        ).dividedBy(ctezXtzQuipuswapStorage.storage.token_pool);

        const priceOfOneInstaInCtez = new BigNumber(
            ctezContractStorage.data.tokensPool[1].balance
        )
            .multipliedBy(
                new BigNumber(
                    ctezContractStorage.data.tokensPool[1].extraDecimals
                )
            )
            .dividedBy(
                new BigNumber(
                    ctezContractStorage.data.tokensPool[0].balance
                ).multipliedBy(
                    new BigNumber(
                        ctezContractStorage.data.tokensPool[0].extraDecimals
                    )
                )
            );

        // Fetch price of xtz
        const tezosPrice = new BigNumber(tezosPriceUSD);
        const instaPriceInUSD = priceOfOneInstaInCtez
            .multipliedBy(priceOfOneCtezInXtz)
            .multipliedBy(tezosPrice);
        return instaPriceInUSD.toString();
    } catch (error) {
        return 0;
    }
    // Divided the priceOfOneCtezInXtz by 10 ** 6
};
export const fetchUserLiquidityPositions = async ({
    tokenIndex,
    baseTokenDecimal,
    contractAddress,
    NETWORK,
}) => {
    const tokenInfo = DEX_LIQUIDITY_TOKEN_CONFIG.filter(
        (pool) => pool.id === tokenIndex
    )[0];
    try {
        const options = {
            name: NETWORK.toLowerCase(),
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        const rpcNode = RPC_NODES[NETWORK.toLowerCase()];
        const address = account.address;
        const url = `${rpcNode}/chains/main/blocks/head/context/contracts/${contractAddress}/storage`;
        const response = await axios.get(url);
        const data = response.data.args[0].args[2].map((item) => {
            return item.args;
        });
        let positions;
        if (data.length > 0) {
            if (
                data.filter((item) => {
                    return item[0].string === address;
                }).length > 0
            ) {
                positions = data.filter((item) => {
                    return item[0].string === address;
                })[0][1].args[1];
            }
        }
        if (!positions) {
            return {
                success: true,
                data: {
                    networkToken: {
                        name: tokenInfo.FIRST_TOKEN_SYMBOL,
                        logo: tokenInfo.FIRST_TOKEN_LOGO,
                    },
                    baseToken: {
                        name: tokenInfo.SECOND_TOKEN_SYMBOL,
                        logo: tokenInfo.SECOND_TOKEN_LOGO,
                    },
                    positions: [],
                },
            };
        }
        const liquidityProvidedToken = [].concat([
            ...positions.map((item) => {
                return {
                    amount:
                        parseInt(item.args[1].args[0].args[1].int) /
                        Math.pow(
                            10,
                            item.args[1].args[2].int === '0'
                                ? 9
                                : baseTokenDecimal
                        ),
                    tokenId: item.args[1].args[2].int,
                    positionId: item.args[0].int,
                };
            }),
        ]);
        return {
            success: true,
            data: {
                networkToken: {
                    name: tokenInfo.FIRST_TOKEN_SYMBOL,
                    logo: tokenInfo.FIRST_TOKEN_LOGO,
                },
                baseToken: {
                    name: tokenInfo.SECOND_TOKEN_SYMBOL,
                    logo: tokenInfo.SECOND_TOKEN_LOGO,
                },
                positions: liquidityProvidedToken,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: {
                networkToken: {
                    name: tokenInfo.FIRST_TOKEN_SYMBOL,
                    logo: tokenInfo.FIRST_TOKEN_LOGO,
                },
                baseToken: {
                    name: tokenInfo.SECOND_TOKEN_SYMBOL,
                    logo: tokenInfo.SECOND_TOKEN_LOGO,
                },
                positions: 0,
            },
        };
    }
};
export const getNetWorkTokenLimit = async (args) => {
    try {
        const { contractAddress, tokenId } = args;
        // Get LP token balance of the converter.
        const converterStorage = await axios.get(
            `${TZKT_NODES.testnet}/v1/contracts/${contractAddress}/storage`
        );
        const lpAddress = converterStorage.data.lpToken.address;

        let balanceData = await axios.get(
            `${TZKT_NODES.testnet}/v1/tokens/balances?token.contract=${lpAddress}&balance.gt=0&limit=10000`
        );

        const converterBalanceData = balanceData.data.find((d) => {
            return d.account.address === contractAddress;
        });
        let converterBalance;
        if (converterBalanceData) {
            converterBalance = parseInt(converterBalanceData.balance);
        } else {
            converterBalance = 0;
        }
        // Get total LP supply.
        const tokenContractStorage = await axios.get(
            `${TZKT_NODES.testnet}/v1/contracts/${lpAddress}/storage`
        );
        const bigMapStorage = await axios.get(
            `${TZKT_NODES.testnet}/v1/bigmaps/${tokenContractStorage.data.total_supply}/keys`
        );
        // Calculate and return
        const { value } = bigMapStorage.data.find(
            (k) => k.key === tokenId.toString()
        );
        const poolRate = {
            n:
                parseInt(converterStorage.data.tokensPool[0].balance) *
                1000000000 *
                2,
            d: parseInt(value),
        };

        const limit =
            (converterBalance * poolRate.n + (poolRate.n - 1)) / poolRate.d;
        const finalLimit = (limit / 10 ** 18).PrecisionMaker(2);
        return {
            success: true,
            data: {
                limit: finalLimit,
            },
            error: null,
        };
    } catch (err) {
        return {
            success: false,
            data: {
                limit: 0,
            },
            error: err,
        };
    }
};
export const getLiquidityPositions = async ({
    tokenIndex,
    baseTokenDecimal,
    contractAddress,
    NETWORK,
}) => {
    const tokenInfo = DEX_LIQUIDITY_TOKEN_CONFIG.filter(
        (pool) => pool.id === tokenIndex
    )[0];
    try {
        const options = {
            name: NETWORK.toLowerCase(),
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        const rpcNode = RPC_NODES[NETWORK.toLowerCase()];
        const address = account.address;
        const url = `${rpcNode}/chains/main/blocks/head/context/contracts/${contractAddress}/storage`;
        const response = await axios.get(url);
        const data = response.data.args[0].args[2].map((item) => {
            return item.args;
        });
        let positions;
        if (data.length > 0) {
            if (
                data.filter((item) => {
                    return item[0].string === address;
                }).length > 0
            ) {
                positions = data.filter((item) => {
                    return item[0].string === address;
                })[0][1].args[1];
            }
        }
        if (!positions) {
            return {
                success: true,
                data: {
                    networkToken: {
                        name: tokenInfo.FIRST_TOKEN_SYMBOL,
                        logo: tokenInfo.FIRST_TOKEN_LOGO,
                        addedLiquidity: 0,
                    },
                    baseToken: {
                        name: tokenInfo.SECOND_TOKEN_SYMBOL,
                        logo: tokenInfo.SECOND_TOKEN_LOGO,
                        addedLiquidity: 0,
                    },
                    dexAddress: tokenInfo.DEX_ADDRESS,
                    tokenIndex: tokenIndex,
                    liquidityProvided: 0,
                    lpShare: 0,
                    rewards: 0,
                    APR: 0,
                },
            };
        }
        const liquidityProvidedToken = [].concat([
            ...positions.map((item) => {
                return {
                    amount:
                        parseInt(item.args[1].args[0].args[1].int) /
                        Math.pow(
                            10,
                            item.args[1].args[2].int === '0'
                                ? 9
                                : baseTokenDecimal
                        ),
                    tokenId: item.args[1].args[2].int,
                };
            }),
        ]);
        let tokenLiquidity = [];
        liquidityProvidedToken.map((item) => {
            tokenLiquidity[parseInt(item.tokenId)] = tokenLiquidity[
                parseInt(item.tokenId)
            ]
                ? tokenLiquidity[parseInt(item.tokenId)] + item.amount
                : item.amount;
        });
        const liquidityProvided = liquidityProvidedToken.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        return {
            success: true,
            data: {
                networkToken: {
                    name: tokenInfo.FIRST_TOKEN_SYMBOL,
                    logo: tokenInfo.FIRST_TOKEN_LOGO,
                    addedLiquidity: tokenLiquidity[0] ? tokenLiquidity[0] : 0,
                },
                baseToken: {
                    name: tokenInfo.SECOND_TOKEN_SYMBOL,
                    logo: tokenInfo.SECOND_TOKEN_LOGO,
                    addedLiquidity: tokenLiquidity[1] ? tokenLiquidity[1] : 0,
                },
                dexAddress: tokenInfo.DEX_ADDRESS,
                // for apr in portfolio
                dexAddress2: tokenInfo.DEX_ADDRESS2,
                tokenIndex: tokenIndex,
                liquidityProvided: liquidityProvided,
                lpShare: 10,
                rewards: 0,
                APR: 0,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: {
                networkToken: {
                    name: tokenInfo.FIRST_TOKEN_SYMBOL,
                    logo: tokenInfo.FIRST_TOKEN_LOGO,
                    addedLiquidity: 0,
                },
                baseToken: {
                    name: tokenInfo.SECOND_TOKEN_SYMBOL,
                    logo: tokenInfo.SECOND_TOKEN_LOGO,
                    addedLiquidity: 0,
                },
                dexAddress: tokenInfo.DEX_ADDRESS,
                tokenIndex: tokenIndex,
                liquidityProvided: 0,
                lpShare: 0,
                rewards: 0,
                APR: 0,
            },
        };
    }
};
export const getAllLiquidityPositions = async ({ NETWORK }) => {
    try {
        const poolPromise = DEX_LIQUIDITY_TOKEN_CONFIG.map(async (pool) => {
            return await getLiquidityPositions({
                tokenIndex: pool.id,
                baseTokenDecimal: pool.DECIMAL_SECOND_TOKEN,
                contractAddress: pool.DEX_ADDRESS,
                NETWORK: NETWORK,
            });
        });
        const result = await Promise.all(poolPromise);
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
        };
    }
};
