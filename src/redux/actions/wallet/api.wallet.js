import { BeaconWallet } from '@taquito/beacon-wallet';

import { NAME, WALLET_NETWORK } from '../../../config/config';
export const ConnectWalletAPI = async () => {
    try {
        const network = {
            type: WALLET_NETWORK,
        };
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        if (!account) {
            await wallet.client.requestPermissions({
                network,
            });
            account = await wallet.client.getActiveAccount();
        }
        return {
            success: true,
            wallet: account.address,
        };
    } catch (error) {
        return {
            success: false,
            wallet: null,
            error,
        };
    }
};
export const FetchWalletAPI = async () => {
    try {
        const options = {
            name: NAME,
        };
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        if (!account) {
            return {
                success: false,
                wallet: null,
            };
        }
        return {
            success: true,
            wallet: account.address,
        };
    } catch (error) {
        return {
            success: false,
            wallet: null,
        };
    }
};
export const SwitchAddressAPI = async ({ NETWORK }) => {
    try {
        const options = {
            name: NAME,
        };
        const connectedNetwork = NETWORK.toLowerCase();
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        await wallet.client.requestPermissions({
            network: {
                type: connectedNetwork === 'testnet' ? 'ghostnet' : 'mainnet',
            },
        });
        account = await wallet.client.getActiveAccount();
        return {
            success: true,
            wallet: account.address,
        };
    } catch (error) {
        return {
            success: false,
            wallet: null,
            error,
        };
    }
};
