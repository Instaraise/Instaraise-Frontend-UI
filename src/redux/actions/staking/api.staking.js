import { BeaconWallet } from '@taquito/beacon-wallet';
import { OpKind, TezosToolkit } from '@taquito/taquito';
import axios from 'axios';
import { TezosMessageUtils, TezosParameterFormat } from 'conseiljs';

import {
    NAME,
    NETWORK,
    RPC_NODES,
    STAKES,
    TZKT_NODES,
} from '../../../config/config';

/**
 *
 * @param {
 * amount: number,
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash: string,}
 */
export const stakeInstaAPI = async (args) => {
    try {
        const options = {
            name: NAME,
        };
        const connectedNetwork = NETWORK;
        const wallet = new BeaconWallet(options);
        const account = await wallet.client.getActiveAccount();
        const userAddress = account.address;
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const poolContractInstance = await Tezos.wallet.at(
            STAKES.INSTA[args.poolStake].STAKING_CONTRACT
        );
        const tokenContractInstance = await Tezos.wallet.at(
            STAKES.INSTA[args.poolStake].TOKEN_ADDRESS
        );
        let tokenAmount = args.amount * Math.pow(10, 9);
        let batch = null;
        batch = Tezos.wallet
            .batch()
            .withContractCall(
                tokenContractInstance.methods.update_operators([
                    {
                        add_operator: {
                            owner: userAddress,
                            operator:
                                STAKES.INSTA[args.poolStake].STAKING_CONTRACT,
                            token_id: 0,
                        },
                    },
                ])
            )
            .withContractCall(poolContractInstance.methods.stake(tokenAmount))
            .withContractCall(
                tokenContractInstance.methods.update_operators([
                    {
                        remove_operator: {
                            owner: userAddress,
                            operator:
                                STAKES.INSTA[args.poolStake].STAKING_CONTRACT,
                            token_id: 0,
                        },
                    },
                ])
            );
        const batchOperation = await batch.send();
        await batchOperation.confirmation().then(() => batchOperation.opHash);
        return {
            success: true,
            operationId: batchOperation.opHash,
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
 * @param {
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash: string,
 * }
 */
export const claimInstaRewardsApi = async (args) => {
    try {
        const connectedNetwork = NETWORK;
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        const Tezos = new TezosToolkit(RPC_NODES[connectedNetwork]);
        Tezos.setRpcProvider(RPC_NODES[connectedNetwork]);
        Tezos.setWalletProvider(wallet);
        const contract = await Tezos.wallet.at(
            STAKES.INSTA[args.poolStake].STAKING_CONTRACT
        );
        const operation = await contract.methods.claim(0).send();
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
 * @param {
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash : string,
 * }
 */
export const fetchInstaStorageApi = async (args) => {
    try {
        const connectedNetwork = NETWORK;
        const RPC_RESPONSE = await axios.get(
            `${
                RPC_NODES[connectedNetwork]
            }/chains/main/blocks/head/context/contracts/${
                STAKES.INSTA[args.poolStake].STAKING_CONTRACT
            }/storage`
        );
        const DEX_RESPONSE = await axios.get(
            `${
                RPC_NODES[connectedNetwork]
            }/chains/main/blocks/head/context/contracts/${
                STAKES.INSTA[args.poolStake].DEX_CONTRACT
            }/storage`
        );

        let blockData = await axios.get(
            `${TZKT_NODES[connectedNetwork]}/v1/blocks/count`
        );
        const currentBlockLevel = blockData.data;

        const XTZ_PRICE_REQUEST = await axios.get(
            `https://api.coingecko.com/api/v3/coins/tezos?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
        );
        const XTZ_PRICE =
            XTZ_PRICE_REQUEST.data.market_data.current_price['usd'];

        const TEZ_POOL =
            parseInt(
                DEX_RESPONSE.data.args[1].args[0].args[1].args[2].int,
                10
            ) / Math.pow(10, 6);

        const TOKEN_POOL =
            parseInt(DEX_RESPONSE.data.args[1].args[0].args[3].int, 10) /
            Math.pow(10, 9);

        const TOTAL_STAKED = (
            parseInt(RPC_RESPONSE.data.args[0].args[2].args[3].int, 10) /
            Math.pow(10, 9)
        ).PrecisionMaker(0);

        const TVL = (TEZ_POOL / TOKEN_POOL) * TOTAL_STAKED * XTZ_PRICE;

        const REWARD_PER_BLOCK = parseInt(
            RPC_RESPONSE.data.args[0].args[2].args[0].args[1].int,
            10
        );

        const REWARD_RATE =
            (REWARD_PER_BLOCK / Math.pow(10, 9)).PrecisionMaker(9) * 100;

        const APR = (REWARD_RATE * 1051200) / TOTAL_STAKED;

        const APY = (
            (Math.pow(1 + APR / 100 / 365, 365) - 1) *
            100
        ).PrecisionMaker(0);

        const STAKED_AMOUNT = await getStakedAmount(args);
        let poolWeightedScore = 0;
        let currentier = 'None';
        if (STAKED_AMOUNT.balance < 2000) {
            poolWeightedScore = 0;
            currentier = 'None';
        } else if (
            STAKED_AMOUNT.balance >= 2000 &&
            STAKED_AMOUNT.balance < 20000
        ) {
            poolWeightedScore = 20;
            currentier = 'Economy';
        } else if (
            STAKED_AMOUNT.balance >= 20000 &&
            STAKED_AMOUNT.balance < 50000
        ) {
            poolWeightedScore = 100;
            currentier = 'Business Class';
        } else if (
            STAKED_AMOUNT.balance >= 50000 &&
            STAKED_AMOUNT.balance < 100000
        ) {
            poolWeightedScore = 300;
            currentier = 'First Class';
        } else if (STAKED_AMOUNT.balance >= 100000) {
            poolWeightedScore = 500;
            currentier = 'Executive First class';
        }
        return {
            success: true,
            data: {
                TVL,
                APR: APR,
                APY: APY,
                poolWeightedScore: poolWeightedScore,
                currentTier: currentier,
                stakedamount: STAKED_AMOUNT.balance,
                currentBlockLevel,
                stakings: STAKED_AMOUNT.singularStakes,
            },
        };
    } catch (error) {
        return {
            success: false,
            data: {
                TVL: 0,
                APR: 0,
                APY: 0,
                poolWeightedScore: 0,
                currentTier: 'None',
                stakedamount: 0,
                currentBlockLevel: 0,
                stakings: [],
            },
        };
    }
};

/**
 *
 * @param {
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash : string,
 * }
 */
export const getStakedAmount = async (args) => {
    try {
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        const address = account.address;
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
        const connectedNetwork = NETWORK;
        const rpcNode = RPC_NODES[connectedNetwork];
        const packedKey = FetchPackedKey(address);
        const url = `${rpcNode}/chains/main/blocks/head/context/big_maps/${
            STAKES.INSTA[args.poolStake].CONTRACT_BIG_MAP
        }/${packedKey}`;
        const response = await axios.get(url);
        let blockData = await axios.get(
            `${TZKT_NODES[NETWORK]}/v1/blocks/count`
        );

        let balance = response.data.args[0].args[0].args[1].int;
        balance = parseInt(balance);
        balance = balance / Math.pow(10, 9);
        let singularStakes = [];
        for (let i = 0; i < response.data.args[0].args[0].args[0].length; i++) {
            let amount = parseInt(
                response.data.args[0].args[0].args[0][i].args[1].args[0].int
            );
            amount = parseFloat(
                response.data.args[0].args[0].args[0][i].args[1].args[0].int /
                    Math.pow(10, 9)
            );
            singularStakes.push({
                mapId: response.data.args[0].args[0].args[0][i].args[0].int,
                amount: amount,
                block: response.data.args[0].args[0].args[0][i].args[1].args[1]
                    .int,
                withdrawPercentage:
                    blockData.data -
                    response.data.args[0].args[0].args[0][i].args[1].args[1]
                        .int,
            });
        }
        return {
            success: true,
            balance,
            singularStakes,
        };
    } catch (error) {
        return {
            success: false,
            balance: 0,
            singularStakes: [],
        };
    }
};
/**
 *
 * @param {
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash : string,
 * }
 */

export const FetchPackedKey = (address) => {
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

export const fetchInstaBalanceApi = async (args) => {
    try {
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        const address = account.address;

        let balancesResponse = await getBalanceAmount(
            STAKES.INSTA[args.poolStake].BIG_MAP_KEY,
            FetchPackedKey(address),
            STAKES.INSTA[args.poolStake].DECIMAL
        );
        return {
            success: true,
            response: balancesResponse,
        };
    } catch (error) {
        return {
            success: false,
            response: 0,
        };
    }
};

export const getBalanceAmount = async (mapId, packedKey, decimal) => {
    try {
        let balance;
        const connectedNetwork = NETWORK;
        const rpcNode = RPC_NODES[connectedNetwork];
        const url = `${rpcNode}/chains/main/blocks/head/context/big_maps/${mapId}/${packedKey}`;
        const response = await axios.get(url);
        balance = parseInt(response.data.int);
        balance = balance / Math.pow(10, decimal);
        return balance;
    } catch (error) {
        return 0;
    }
};

/**
 *
 * @param {
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash : string,
 * }
 */

export const GetHarvestValueAPI = async (args) => {
    try {
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        const address = account.address;
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
        const packedAddress = FetchPackedKey(address);

        const connectedNetwork = NETWORK;
        const rpcNode = RPC_NODES[connectedNetwork];
        let blockData = await axios.get(
            `${TZKT_NODES[connectedNetwork]}/v1/blocks/count`
        );
        const currentBlockLevel = blockData.data;
        let url = `${rpcNode}/chains/main/blocks/head/context/contracts/${
            STAKES.INSTA[args.poolStake].STAKING_CONTRACT
        }/storage`;
        const smartContractResponse = await axios.get(url);
        let periodFinish =
            smartContractResponse.data.args[0].args[2].args[0].args[0].args[0]
                .int;
        let lastUpdateTime =
            smartContractResponse.data.args[0].args[2].args[0].args[0].args[1]
                .int;
        let rewardRate =
            smartContractResponse.data.args[0].args[2].args[0].args[1].int;
        let totalStaked =
            smartContractResponse.data.args[0].args[2].args[3].int;
        let rewardPerTokenStored =
            smartContractResponse.data.args[0].args[2].args[0].args[2].int;
        if (totalStaked === 0) {
            throw new Error('No One Staked');
        }
        let rewardPerToken = Math.min(
            currentBlockLevel,
            parseInt(periodFinish)
        );
        rewardPerToken = rewardPerToken - parseInt(lastUpdateTime);
        rewardPerToken *= parseInt(rewardRate) * Math.pow(10, 9);
        rewardPerToken =
            rewardPerToken / totalStaked + parseInt(rewardPerTokenStored);

        url = `${rpcNode}/chains/main/blocks/head/context/big_maps/${
            STAKES.INSTA[args.poolStake].CONTRACT_BIG_MAP
        }/${packedAddress}`;
        let bigMapResponse = await axios.get(url);
        let userBalance = bigMapResponse.data.args[0].args[0].args[1].int;
        let userRewardPaid = bigMapResponse.data.args[3].int;
        let rewards = bigMapResponse.data.args[2].int;

        let totalRewards =
            parseInt(userBalance) * (rewardPerToken - parseInt(userRewardPaid));
        totalRewards = totalRewards / Math.pow(10, 9) + parseInt(rewards);
        totalRewards = totalRewards / Math.pow(10, 9);
        if (totalRewards < 0) {
            totalRewards = 0;
        }
        return {
            success: true,
            totalRewards,
        };
    } catch (error) {
        return {
            success: false,
            totalRewards: 0,
        };
    }
};

/**
 *
 * @param {
 * stakesToUnstake : Array,
 * poolStake : string, "ACTIVE" | "INACTIVE"
 * } args
 * @returns {
 * transactionHash : string,}
 */
export const unStakeApi = async (args) => {
    try {
        const options = {
            name: NAME,
        };
        const connectedNetwork = NETWORK;
        const wallet = new BeaconWallet(options);
        const rpcNode = RPC_NODES[connectedNetwork];
        const Tezos = new TezosToolkit(rpcNode);
        Tezos.setRpcProvider(rpcNode);
        Tezos.setWalletProvider(wallet);
        const contractInstance = await Tezos.wallet.at(
            STAKES.INSTA[args.poolStake].STAKING_CONTRACT
        );
        let unstakeBatch = [];
        // eslint-disable-next-line
        args.stakesToUnstake.map((stake) => {
            unstakeBatch.push({
                kind: OpKind.TRANSACTION,
                ...contractInstance.methods
                    .unstake(stake.stake.mapId)
                    .toTransferParams(),
            });
        });
        let batch = Tezos.wallet.batch(unstakeBatch);
        const batchOperation = await batch.send();
        await batchOperation.confirmation().then(() => batchOperation.opHash);
        return {
            success: true,
            operationId: batchOperation.opHash,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};
