import axios from 'axios';
import BigNumber from 'bignumber.js';
import CoinGecko from 'coingecko-api';

import { getBalance } from './api.dex';
import {
    addLiquidity,
    fetchPoolStats,
    fetchTokenPrice,
    fetchUserLiquidityPositions,
    getNetWorkTokenLimit,
    removeLiquidity,
} from './api.liquidity';
import {
    ADD_LIQUIDITY,
    CONVERT_TOKEN_VALUE_POOLS,
    GET_TOKEN_BALANCE_TYPE,
    HANDLE_TOKEN_VALUE_POOL,
    POOL_NETWORK_TOKEN_LIMIT,
    POOL_STATS_DATA,
    REMOVE_POOL_LIQUIDITY,
    SET_LIQUIDITY_POOL_PAIR,
    SET_STAKED_TOKEN_NAME,
    USER_LIQUIDITY_POSITIONS,
} from '../index.action';
import { DEX_NETWORK, TZKT_NODES } from '../../../config/config';
import { CONTRACT_CONFIG } from '../../../config/network.config';
const coingecko = new CoinGecko();
export const POOL_STATS = () => {
    return async (dispatch) => {
        const API_RESP = await fetchPoolStats();
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
export const CONVERT_TOKEN_VALUES_POOLS = (data) => {
    return async (dispatch) => {
        const API_RESP = await fetchTokenPrice(data);
        if (API_RESP.success) {
            const price = API_RESP.value[`${data.token1}_in_dollars`];
            const token_price_in_insta = data.number * (1 / price);
            const token_price_dollar = price * data.number;
            return dispatch({
                type: CONVERT_TOKEN_VALUE_POOLS,
                payload: {
                    value: data.status
                        ? token_price_dollar
                        : token_price_in_insta,
                    token_price_in_insta: token_price_in_insta,
                    token_price_dollar: token_price_dollar,
                },
            });
        } else {
            return dispatch({
                type: CONVERT_TOKEN_VALUE_POOLS,
                payload: {
                    value: null,
                    token_price_in_insta: 0,
                    token_price_dollar: 0,
                },
            });
        }
    };
};
export const GET_TOKEN_BALANCE = (args) => {
    return async (dispatch) => {
        const API_RESP = await getBalance(
            args.tokenId,
            args.tokenType,
            args.network.toLowerCase(),
            args.DECIMAL
        );
        return dispatch({
            type: GET_TOKEN_BALANCE_TYPE,
            payload: API_RESP,
        });
    };
};
const getTezosPriceInUSD = async () => {
    const data = await coingecko.simple.price({
        ids: 'tezos',
        vs_currencies: 'usd',
    });
    return data.data.tezos.usd;
};
export const getInstaPrice = async () => {
    try {
        const tezosPriceUSD = await getTezosPriceInUSD();
        const CTEZ_CONVERTER = CONTRACT_CONFIG[DEX_NETWORK][5].CONVERTER;
        const ctezContractStorage = await axios.get(
            `${TZKT_NODES.testnet}/v1/contracts/${CTEZ_CONVERTER}/storage`
        );

        const ctezXtzQuipuswapStorage = (
            await axios.get(
                `https://api.tzkt.io/v1/contracts/KT1FbYwEWU8BTfrvNoL5xDEC5owsDxv9nqKT/storage`
            )
        ).data;

        const priceOfOneCtezInXtz = new BigNumber(
            ctezXtzQuipuswapStorage.storage.tez_pool
        ).dividedBy(ctezXtzQuipuswapStorage.storage.token_pool);

        const priceOfOneInstaInCtez = new BigNumber(
            ctezContractStorage.data.tokensPool[1].balance
        )
            .multipliedBy(
                new BigNumber(
                    ctezContractStorage.data.tokensPool[1].extraDecimals
                )
            )
            .dividedBy(
                new BigNumber(
                    ctezContractStorage.data.tokensPool[0].balance
                ).multipliedBy(
                    new BigNumber(
                        ctezContractStorage.data.tokensPool[0].extraDecimals
                    )
                )
            );

        // Fetch price of xtz
        const tezosPrice = new BigNumber(tezosPriceUSD);
        const instaPriceInUSD = priceOfOneInstaInCtez
            .multipliedBy(priceOfOneCtezInXtz)
            .multipliedBy(tezosPrice);
        return instaPriceInUSD.toString();
    } catch (error) {
        return 0;
    }
    // Divided the priceOfOneCtezInXtz by 10 ** 6
};
export const GET_USER_LIQUIDITY_POSITION = (args) => {
    return async (dispatch) => {
        const API_RESP = await fetchUserLiquidityPositions({
            tokenIndex: args.tokenIndex,
            baseTokenDecimal: args.baseTokenDecimal,
            contractAddress: args.contractAddress,
            NETWORK: args.NETWORK,
        });
        if (API_RESP.success) {
            return dispatch({
                type: USER_LIQUIDITY_POSITIONS,
                payload: API_RESP.data,
            });
        } else {
            return dispatch({
                type: USER_LIQUIDITY_POSITIONS,
                payload: API_RESP.data,
            });
        }
    };
};
export const NETWORK_TOKEN_LIMIT = (args) => {
    return async (dispatch) => {
        const API_RESP = await getNetWorkTokenLimit(args);
        if (API_RESP.success) {
            return dispatch({
                type: POOL_NETWORK_TOKEN_LIMIT,
                payload: API_RESP,
            });
        } else {
            return dispatch({
                type: POOL_NETWORK_TOKEN_LIMIT,
                payload: API_RESP,
            });
        }
    };
};
export const ADD_TOKEN_LIQUIDITY = (args) => {
    return async (dispatch) => {
        const API_RESP = await addLiquidity(args);
        if (API_RESP.success) {
            return dispatch({
                type: ADD_LIQUIDITY,
                payload: {
                    success: true,
                    operationId: API_RESP.operationId,
                },
            });
        } else {
            return dispatch({
                type: ADD_LIQUIDITY,
                payload: {
                    success: false,
                    operationId: null,
                },
            });
        }
    };
};
export const REMOVE_LIQUIDITY = (args) => {
    return async (dispatch) => {
        const API_RESP = await removeLiquidity(args);
        if (API_RESP.success) {
            return dispatch({
                type: REMOVE_POOL_LIQUIDITY,
                payload: API_RESP,
            });
        } else {
            return dispatch({
                type: REMOVE_POOL_LIQUIDITY,
                payload: API_RESP,
            });
        }
    };
};
