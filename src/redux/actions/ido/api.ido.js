import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';
import { TezosMessageUtils, TezosParameterFormat } from 'conseiljs';

import { NAME, NETWORK, RPC_NODES } from '../../../config/config';
// import { WHITELISTED_USERS } from "./UserAddresses";

//Returns the user's allocation and tier from the blockchain
/**
 *
 * @param {contractAddress} args
 * @param {ENROLLMENT_KEY} args
 * @param {pricePerToken} args
 * @param {DECIMALS} args;
 * @returns {
 * success: boolean,
 * data : {
 *  currentier,
 *  allocation,
 *  totalTokensSold,
 *  totalTokensToSell,
 *  IsWhitelistedUser,
 *  totalXTZRaised,
 *  totalPoolWeight,
 *  yourAllocation,
 * }
 *
 * }
 */
export const FetchSaleDataAPI = async (args) => {
    const {
        contractAddress,
        ENROLLMENT_KEY,
        SALE_MAP_KEY,
        // eslint-disable-next-line
        pricePerToken,
        DECIMALS,
    } = args;
    try {
        const connectedNetwork = NETWORK;
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);

        let account = await wallet.client.getActiveAccount();

        const FetchPackedKey = (address) => {
            const accountHex = `0x${TezosMessageUtils.writeAddress(address)}`;
            const packedKey = TezosMessageUtils.encodeBigMapKey(
                Buffer.from(
                    TezosMessageUtils.writePackedData(
                        `${accountHex}`,
                        '',
                        TezosParameterFormat.Michelson
                    ),
                    'hex'
                )
            );
            return packedKey;
        };
        const RPC_RESPONSE = await axios.get(
            `${RPC_NODES[connectedNetwork]}/chains/main/blocks/head/context/contracts/${contractAddress}/storage`
        );
        const poolData = RPC_RESPONSE.data;
        const totalPoolWeight = poolData.args[4].int;
        const totalTokensToSell = poolData.args[0].args[2].args[1].int;
        const totalTokensSold =
            poolData.args[0].args[4].int / Math.pow(10, args.DECIMALS);
        const totalXTZRaised = poolData.args[0].args[5].int / Math.pow(10, 6);
        let allocation = 0;
        let currentier;
        let yourAllocation = 0;
        let IsWhitelistedUser = false;

        if (account && account.address) {
            const USER_LIST = poolData.args[6].map((elem) => elem.string);
            IsWhitelistedUser = USER_LIST.filter(
                (item) => item === account.address
            )[0]
                ? true
                : false;

            const packedKey = FetchPackedKey(account.address);
            const response = await fetchUserData(
                connectedNetwork,
                ENROLLMENT_KEY,
                packedKey
            );
            const allocationResponse = await fetchYourAllocation(
                connectedNetwork,
                SALE_MAP_KEY,
                packedKey
            );
            var yourInvestments = [];

            if (allocationResponse.success) {
                allocationResponse.response.data.args[0].args[0].forEach(
                    (item) => {
                        let investment = {
                            time: new Date(
                                item.args[1].args[2].string
                            ).toISOString(),
                            xtzInvested:
                                item.args[1].args[0].args[1].int /
                                Math.pow(10, 6),
                            tokensReceived:
                                item.args[1].args[0].args[0].int /
                                Math.pow(10, args.DECIMALS),
                        };
                        yourInvestments.push(investment);
                    }
                );

                yourAllocation =
                    allocationResponse.response.data.args[0].args[0]
                        .map((item) => {
                            return parseInt(item.args[1].args[0].args[0].int);
                        })
                        .reduce((a, b) => a + b, 0) /
                    Math.pow(10, args.DECIMALS);
            }
            if (response.success) {
                const poolWeight = response.response.data.int;
                if (poolWeight < 100) {
                    currentier = 'EC';
                } else if (poolWeight >= 100 && poolWeight < 300) {
                    currentier = 'BC';
                } else if (poolWeight >= 300 && poolWeight < 500) {
                    currentier = 'FC';
                } else if (poolWeight >= 500) {
                    currentier = 'EFC';
                } else {
                    currentier = 'FCFS';
                }
                const SALE_PRICE =
                    parseInt(poolData.args[2].args[2].int, 10) /
                    Math.pow(10, 6);
                const floatValue =
                    (((poolWeight / totalPoolWeight) * totalTokensToSell) /
                        Math.pow(10, DECIMALS)) *
                    SALE_PRICE;

                allocation = floatValue.PrecisionMaker(2);
            }
        }
        return {
            success: true,
            data: {
                currentier,
                allocation,
                totalTokensSold,
                totalTokensToSell,
                IsWhitelistedUser,
                totalXTZRaised,
                totalPoolWeight,
                yourAllocation,
                yourInvestments,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: {
                currentier: 'FCFS',
                allocation: 0,
                totalTokensSold: 0,
                totalXTZRaised: 0,
                totalPoolWeight: 0,
                IsWhitelistedUser: false,
                totalTokensToSell: 0,
                yourAllocation: 0,
                yourInvestments: [],
            },
        };
    }
};

/**
 * to participate in the sale hit this endpoint
 * @param {
 * amount : number,
 * STAKE_TYPE : string,
 * contractAddress : string,
 * } args
 * @returns {
 * success: boolean,
 *  data : {
 *   transactionHash : string,
 * }
 *
 * }
 */
export const ParticipateInSaleDataAPI = async (args) => {
    try {
        const connectedNetwork = NETWORK;
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const contract = await Tezos.wallet.at(args.contractAddress);
        const amount = args.amount;
        let operation;
        if (args.STAKE_TYPE === 'private') {
            operation = await contract.methods
                .participatePrivateSale(0)
                .send({ amount });
        } else {
            operation = await contract.methods
                .participatePublicSale(0)
                .send({ amount });
        }
        const operationHash = await operation
            .confirmation()
            .then(() => operation.opHash);

        return {
            success: true,
            operationHash,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

/**
 *
 * @param {contractAddress : string} args
 * @returns {
 * success: boolean,
 * data : {
 * transactionHash : string,
 * }
 * }
 */
export const withdrawTokensAPI = async (args) => {
    try {
        const connectedNetwork = NETWORK;
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const contract = await Tezos.wallet.at(args.contractAddress);
        const operation = await contract.methods.withdrawTokens(0).send();
        const operationHash = await operation
            .confirmation()
            .then(() => operation.opHash);
        return {
            success: true,
            operationHash,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

const fetchUserData = async (connectedNetwork, ENROLLMENT_KEY, packedKey) => {
    try {
        const url = `${RPC_NODES[connectedNetwork]}/chains/main/blocks/head/context/big_maps/${ENROLLMENT_KEY}/${packedKey}`;
        const response = await axios.get(url);

        return {
            success: true,
            response,
        };
    } catch (error) {
        return {
            success: false,
            response: null,
        };
    }
};

const fetchYourAllocation = async (
    connectedNetwork,
    SALE_MAP_KEY,
    packedKey
) => {
    try {
        const url = `${RPC_NODES[connectedNetwork]}/chains/main/blocks/head/context/big_maps/${SALE_MAP_KEY}/${packedKey}`;
        const response = await axios.get(url);
        return {
            success: true,
            response,
        };
    } catch (error) {
        return {
            success: false,
            response: null,
        };
    }
};

export const claimSaleAPI = async (args) => {
    try {
        const connectedNetwork = NETWORK;
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const contract = await Tezos.wallet.at(args.contractAddress);
        const operation = await contract.methods.withdrawTokens(0).send();
        const operationHash = await operation
            .confirmation()
            .then(() => operation.opHash);
        return {
            success: true,
            operationHash,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};
