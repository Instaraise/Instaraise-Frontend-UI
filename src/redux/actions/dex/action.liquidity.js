import { fetchPoolStats } from './api.liquidity';
import {
    CONVERT_TOKEN_VALUE_POOLS,
    HANDLE_TOKEN_VALUE_POOL,
    POOL_STATS_DATA,
    SET_LIQUIDITY_POOL_PAIR,
    SET_STAKED_TOKEN_NAME,
} from '../index.action';
export const POOL_STATS = (args) => {
    return async (dispatch) => {
        const API_RESP = await fetchPoolStats(args);
        if (API_RESP.success) {
            return dispatch({
                type: POOL_STATS_DATA,
                payload: API_RESP,
            });
        } else {
            return dispatch({
                type: POOL_STATS_DATA,
                payload: API_RESP,
            });
        }
    };
};
export const SELECT_POOL_PAIR = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: SET_LIQUIDITY_POOL_PAIR,
            payload: data,
        });
    };
};
export const HANDLE_TOKEN_VALUE_POOLS = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: HANDLE_TOKEN_VALUE_POOL,
            payload: data,
        });
    };
};
export const SET_STAKED_TOKEN = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: SET_STAKED_TOKEN_NAME,
            payload: data,
        });
    };
};
export const SET_CONVERTED_VALUE_EMPTY = () => {
    return async (dispatch) => {
        return dispatch({
            type: CONVERT_TOKEN_VALUE_POOLS,
            payload: {
                value: null,
                token_price_in_insta: 0,
                token_price_dollar: 0,
            },
        });
    };
};
