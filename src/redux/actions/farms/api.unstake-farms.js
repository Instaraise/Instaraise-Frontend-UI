import { BeaconWallet } from '@taquito/beacon-wallet';
import { OpKind, TezosToolkit } from '@taquito/taquito';

import { NAME, NETWORK, RPC_NODES } from '../../../config/config';
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
            args.data.PARAMS.CONTRACT
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
