// eslint-disable-next-line
import { fetchTokenStats, mintTokens } from './api.dex';
import {
    SELECT_NETWORK,
    TOKENS_MINTED,
    TOKEN_STATS_DATA,
} from '../index.action';

export const SELECT_NETWORK_TYPE = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: SELECT_NETWORK.toUpperCase(),
            payload: data,
        });
    };
};
export const MINT_TOKENS = (data) => {
    return async (dispatch) => {
        const API_RESP = await mintTokens(data);
        if (API_RESP.success) {
            return dispatch({
                type: TOKENS_MINTED,
                payload: API_RESP,
            });
        } else {
            return dispatch({
                type: TOKENS_MINTED,
                payload: API_RESP,
            });
        }
    };
};
export const TOKEN_STATS = () => {
    return async (dispatch) => {
        const API_RESP = await fetchTokenStats();
        if (API_RESP.success) {
            return dispatch({
                type: TOKEN_STATS_DATA,
                payload: API_RESP,
            });
        } else {
            return dispatch({
                type: TOKEN_STATS_DATA,
                payload: API_RESP,
            });
        }
    };
};
