// eslint-disable-next-line
import {
    convertTokenAPI,
    fetchPrice,
    fetchPriceImpact,
    fetchTokenStats,
} from './api.dex';
import BigNumber from 'bignumber.js';
import {
    HANDLE_TOKEN_VALUE_DEX,
    PRICE_IMPACT,
    SELECT_NETWORK,
    SELECT_TOKENS_DEX,
    SWAP_TOKENS,
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
export const SELECTED_TOKEN_DEX = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: SELECT_TOKENS_DEX,
            payload: data,
        });
    };
};

export const HANDLE_TOKEN_VALUES_DEX = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: HANDLE_TOKEN_VALUE_DEX,
            payload: data,
        });
    };
};
export const CONVERT_TOKEN_VALUE_DEX = (data) => {
    return async (dispatch) => {
        const API_RESP = await fetchPrice(data);
        if (API_RESP.success) {
            const price = API_RESP.value[`${data.token1}_in_dollars`];
            const swappingBaseToken =
                data.DEX_FROM_ADDRESS === 'INSTA' ||
                data.DEX_TO_ADDRESS === 'INSTA';
            const rate = API_RESP.value.rate;
            const token1_price_dollar = new BigNumber(1 / price).toNumber();
            const token1_price = price;
            const number_of_tokens_received_insta = swappingBaseToken
                ? API_RESP.value[data.token1]
                : API_RESP.value[data.token2];
            const number_of_tokens_received_dollar = rate * token1_price_dollar;
            return dispatch({
                type: 'CONVERT_TOKEN_VALUE_DEX',
                payload: {
                    success: API_RESP.success,
                    data: {
                        token1_price: data.status
                            ? token1_price_dollar
                            : token1_price,
                        token2_price: data.status
                            ? number_of_tokens_received_dollar
                            : token1_price,
                        convertedValue: data.status
                            ? data.number
                            : number_of_tokens_received_insta,
                        rate: rate,
                    },
                },
            });
        } else {
            return dispatch({
                type: 'CONVERT_TOKEN_VALUE_DEX',
                payload: {
                    success: API_RESP.success,
                    data: {
                        token1_price: 0,
                        token2_price: 0,
                        convertedValue: 0,
                        rate: 0,
                    },
                },
            });
        }
    };
};
export const CONVERT_TOKENS = (data) => {
    return async (dispatch) => {
        const API_RESP = await convertTokenAPI(data);
        if (API_RESP.success) {
            return dispatch({
                type: SWAP_TOKENS,
                payload: API_RESP,
            });
        } else {
            return dispatch({
                type: SWAP_TOKENS,
                payload: API_RESP,
            });
        }
    };
};
export const CONVERT_TOKEN_VALUE_DEX_EMPTY_STATE = () => {
    return async (dispatch) => {
        return dispatch({
            type: 'CONVERT_TOKEN_VALUE_DEX',
            payload: {
                success: true,
                data: {
                    token1_price: 0,
                    token2_price: 0,
                    convertedValue: 0,
                    rate: 0,
                    tokenbalance: 0,
                },
            },
        });
    };
};
export const GET_PRICE_IMPACT = (args) => {
    return async (dispatch) => {
        const API_RESP = await fetchPriceImpact(args);
        if (API_RESP.success) {
            return dispatch({
                type: PRICE_IMPACT,
                payload: API_RESP.value,
            });
        } else {
            return dispatch({
                type: PRICE_IMPACT,
                payload: API_RESP.value,
            });
        }
    };
};
