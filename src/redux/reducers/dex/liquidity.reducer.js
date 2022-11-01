import {
    CONVERT_TOKEN_VALUE_POOLS,
    GET_TOKEN_BALANCE_TYPE,
    HANDLE_TOKEN_VALUE_POOL,
    POOL_NETWORK_TOKEN_LIMIT,
    POOL_STATS_DATA,
    SET_LIQUIDITY_POOL_PAIR,
    SET_STAKED_TOKEN_NAME,
    USER_LIQUIDITY_POSITIONS,
} from '../../actions/index.action';
import uUSD_Img from '../../../assets/dex/uUSD.png';
import Insta_Img from '../../../assets/images/INSTA.png';
import { DEX_NETWORK } from '../../../config/config';
export const DEX_INITIAL_STATE = {
    to: {
        id: 5,
        TOKEN_ADDRESS: 'KT1WJUpHRTJVLK7NPp2wRDy1QJuLEY2JKSDJ',
        DEX_ADDRESS: 'INSTA',
        TOKEN_TYPE: 'FA2',
        TOKEN_ID: '0',
        DECIMALS: '9',
        TOKEN_NAME: 'Insta',
        TOKEN_SYMBOL: 'INSTA',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/KT1WJUpHRTJVLK7NPp2wRDy1QJuLEY2JKSDJ/storage`,
        TOKEN_LOGO: Insta_Img,
    },
    from: {
        id: 0,
        TOKEN_ADDRESS: 'KT1WJUpHRTJVLK7NPp2wRDy1QJuLEY2JKSDJ',
        DEX_ADDRESS: 'KT1XCbUT8Br79K9JQs9cLGB23DJhF9YFrnMe',
        TOKEN_TYPE: 'FA2',
        TOKEN_ID: '2',
        DECIMALS: '12',
        TOKEN_NAME: 'uUSD',
        BIG_MAP: '18451',
        TOKEN_SYMBOL: 'uUSD',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/KT1XCbUT8Br79K9JQs9cLGB23DJhF9YFrnMe/storage`,
        TOKEN_LOGO: uUSD_Img,
    },
};
export const getPoolData = (
    initialState = { success: false, data: [], error: null },
    action
) => {
    switch (action.type) {
        case POOL_STATS_DATA:
            return action.payload;
        default:
            return initialState;
    }
};
export const setLiquidityPoolPair = (
    initialState = {
        id: null,
        token1: null,
        token2: null,
        address: null,
        decimals: null,
        token_logo_1: null,
        token_logo_2: null,
    },
    action
) => {
    switch (action.type) {
        case SET_LIQUIDITY_POOL_PAIR:
            return action.payload;
        default:
            return initialState;
    }
};
export const setStakedToken = (initialState = null, action) => {
    switch (action.type) {
        case SET_STAKED_TOKEN_NAME:
            return action.payload;
        default:
            return initialState;
    }
};

export const handle_pay_values_pools = (initialState = '', action) => {
    switch (action.type) {
        case HANDLE_TOKEN_VALUE_POOL:
            return action.payload;
        default:
            return initialState;
    }
};
export const convert_pay_values_pools = (
    initialState = {
        value: null,
        token_price_in_insta: 0,
        token_price_dollar: 0,
    },
    action
) => {
    switch (action.type) {
        case CONVERT_TOKEN_VALUE_POOLS:
            return action.payload;
        default:
            return initialState;
    }
};
export const tokenBalance = (initiailState = 0, action) => {
    switch (action.type) {
        case GET_TOKEN_BALANCE_TYPE:
            return action.payload;
        default:
            return initiailState;
    }
};
export const getUserLiquidityPositions = (
    initiailState = {
        networkToken: {
            name: '',
            logo: '',
            addedLiquidity: 0,
        },
        baseToken: {
            name: '',
            logo: '',
            addedLiquidity: 0,
        },
        positions: [],

        dexAddress: '',
    },
    action
) => {
    switch (action.type) {
        case USER_LIQUIDITY_POSITIONS:
            return action.payload;
        default:
            return initiailState;
    }
};

export const getNetworkTokenLimit = (
    initialState = {
        success: false,
        data: {
            limit: '-',
        },
        error: null,
    },
    action
) => {
    switch (action.type) {
        case POOL_NETWORK_TOKEN_LIMIT:
            return action.payload;
        default:
            return initialState;
    }
};
