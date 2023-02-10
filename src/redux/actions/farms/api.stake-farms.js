import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';
import { TezosMessageUtils, TezosParameterFormat } from 'conseiljs';

import { NAME, NETWORK, RPC_NODES, TZKT_NODES } from '../../../config/config';

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
            args.data.PARAMS.CONTRACT
        );
        const tokenContractInstance = await Tezos.wallet.at(
            args.data.PARAMS.DEX
        );

        let tokenAmount =
            args.amount * Math.pow(10, args.data.PARAMS.LP_DECIMAL);
        let batch = null;
        batch = Tezos.wallet
            .batch()
            .withContractCall(
                tokenContractInstance.methods.update_operators([
                    {
                        add_operator: {
                            owner: userAddress,
                            operator: args.data.PARAMS.CONTRACT,
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
                            operator: args.data.PARAMS.CONTRACT,
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
        const url = `${rpcNode}/chains/main/blocks/head/context/big_maps/${args.PARAMS.MAP_ID}/${packedKey}`;
        const response = await axios.get(url);
        let blockData = await axios.get(
            `${TZKT_NODES[NETWORK]}/v1/blocks/count`
        );
        const currentBlockLevel = blockData.data;
        let balance = response.data.args[0].args[0].args[1].int;
        balance = parseInt(balance);
        balance = balance / Math.pow(10, args.PARAMS.LP_DECIMAL);
        let singularStakes = [];
        for (let i = 0; i < response.data.args[0].args[0].args[0].length; i++) {
            let amount = parseInt(
                response.data.args[0].args[0].args[0][i].args[1].args[0].int
            );
            amount = parseFloat(
                response.data.args[0].args[0].args[0][i].args[1].args[0].int /
                    Math.pow(10, args.PARAMS.LP_DECIMAL)
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
                currentBlockLevel,
            });
        }
        return {
            success: true,
            response: {
                balance,
                currentBlockLevel,
                singularStakes,
            },
        };
    } catch (error) {
        return {
            success: false,
            response: {
                balance: 0,
                singularStakes: [],
            },
        };
    }
};
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
        const contract = await Tezos.wallet.at(args.PARAMS.CONTRACT);
        const operation = await contract.methods.claim(0).send();
        const operationHash = await operation
            .confirmation()
            .then(() => operation.opHash);
        return {
            success: true,
            response: {
                operationId: operationHash,
            },
        };
    } catch (error) {
        return {
            success: false,
            response: {
                error,
            },
        };
    }
};
