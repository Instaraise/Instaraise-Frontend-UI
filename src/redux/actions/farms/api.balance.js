import { BeaconWallet } from '@taquito/beacon-wallet';
import axios from 'axios';
import { TezosMessageUtils, TezosParameterFormat } from 'conseiljs';

import { NAME, NETWORK, RPC_NODES, TZKT_NODES } from '../../../config/config';

export const fetchLpBalanceApi = async (args) => {
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
        let balancesResponse = await getBalanceAmount(
            args.PARAMS.DEX_MAP_ID,
            FetchPackedKey(address),
            args.PARAMS.LP_DECIMAL
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
        balance = parseInt(response.data.args[0].args[1].int);
        balance = balance / Math.pow(10, decimal);
        return balance;
    } catch (error) {
        return 0;
    }
};
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
        let url = `${rpcNode}/chains/main/blocks/head/context/contracts/${args.PARAMS.CONTRACT}/storage`;
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

        url = `${rpcNode}/chains/main/blocks/head/context/big_maps/${args.PARAMS.MAP_ID}/${packedAddress}`;
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
            response: {
                totalRewards: totalRewards,
            },
        };
    } catch (error) {
        return {
            success: false,
            response: {
                totalRewards: 0,
            },
        };
    }
};
