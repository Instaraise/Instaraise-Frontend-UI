import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

import {
    DEX_ADDRESS,
    DEX_NETWORK,
    RPC_NODES,
    TOKEN_DATA_URL,
} from '../../../config/config';
import { DEX_TOKEN_CONFIG } from '../../../config/DexConfig/dex.config';

export const fetchTokenStats = async () => {
    try {
        const response = await axios.get(`${TOKEN_DATA_URL}/v1/tokens`);
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
