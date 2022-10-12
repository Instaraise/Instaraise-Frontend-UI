import { ConnectWalletAPI, FetchWalletAPI } from './api.wallet';
import { WALLET_ADDRESS } from '../index.action';

export const connectWallet = () => {
    return async (dispatch) => {
        const WALLET_RESP = await ConnectWalletAPI();
        if (WALLET_RESP.success) {
            dispatch({
                type: WALLET_ADDRESS,
                payload: WALLET_RESP.wallet,
            });
        } else {
            dispatch({
                type: WALLET_ADDRESS,
                payload: null,
            });
        }
    };
};
export const getWallet = () => {
    return async (dispatch) => {
        const WALLET_RESP = await FetchWalletAPI();
        if (WALLET_ADDRESS.success) {
            dispatch({
                type: WALLET_ADDRESS,
                payload: WALLET_RESP.wallet,
            });
        } else {
            dispatch({
                type: WALLET_ADDRESS,
                payload: WALLET_RESP.wallet,
            });
        }
    };
};
