import { BeaconWallet } from '@taquito/beacon-wallet';

import { NAME, WALLET_NETWORK } from '../../../config/config';
import { testnetNetwork } from '../../../config/network.config';
const options = {
    name: NAME,
};
export const ConnectWalletAPI = async ({ NETWORK }) => {
    try {
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        if (!account) {
            await wallet.client.requestPermissions({
                network: {
                    type:
                        NETWORK.toLowerCase() === 'testnet'
                            ? testnetNetwork
                            : WALLET_NETWORK,
                },
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
export const FetchWalletAPI = async ({ NETWORK }) => {
    try {
        const wallet = new BeaconWallet(options);
        let account = await wallet.client.getActiveAccount();
        const connectedNetwork =
            NETWORK.toLowerCase() === 'testnet'
                ? testnetNetwork
                : WALLET_NETWORK;
        if (account.network.type !== connectedNetwork) {
            await wallet.client.requestPermissions({
                network: {
                    type:
                        NETWORK === 'testnet' ? testnetNetwork : WALLET_NETWORK,
                },
            });
        }

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
                type:
                    connectedNetwork === 'testnet'
                        ? 'ghostnet'
                        : WALLET_NETWORK,
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
export const DisconnectWalletAPI = async ({ NETWORK }) => {
    try {
        const options = {
            name: NETWORK.toLowerCase(),
        };
        const wallet = new BeaconWallet(options);
        await wallet.disconnect();
        return {
            success: true,
            wallet: null,
        };
    } catch (error) {
        return {
            success: false,
            wallet: null,
            error,
        };
    }
};
