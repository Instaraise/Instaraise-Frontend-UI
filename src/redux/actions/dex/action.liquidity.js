import axios from 'axios';
import BigNumber from 'bignumber.js';
import CoinGecko from 'coingecko-api';

import { getBalance } from './api.dex';
import { fetchPoolStats } from './api.liquidity';
import {
    CONVERT_TOKEN_VALUE_POOLS,
    GET_TOKEN_BALANCE_TYPE,
    HANDLE_TOKEN_VALUE_POOL,
    POOL_STATS_DATA,
    SET_LIQUIDITY_POOL_PAIR,
    SET_STAKED_TOKEN_NAME,
} from '../index.action';
import { DEX_NETWORK, TZKT_NODES } from '../../../config/config';
import { CONTRACT_CONFIG } from '../../../config/network.config';
const coingecko = new CoinGecko();
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
