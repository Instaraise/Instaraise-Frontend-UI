import {
    HANDLE_TOKEN_VALUE_DEX,
    PRICE_IMPACT,
    SELECT_NETWORK,
    SELECT_TOKENS_DEX,
    SWAP_TOKENS,
    TOKEN_STATS_DATA,
} from '../../actions/index.action';
import uUSD_Img from '../../../assets/dex/uUSD.png';
import Insta_Img from '../../../assets/images/INSTA.png';
import { DEX_NETWORK } from '../../../config/config';
export const selectNetwork = (initialState = 'TESTNET', action) => {
    switch (action.type) {
        case SELECT_NETWORK:
            return action.payload;
        default:
            return initialState;
    }
};
export const getTokenData = (
    initialState = {
        success: false,
        data: [],
        error: null,
    },
    action
) => {
    switch (action.type) {
        case TOKEN_STATS_DATA:
            return action.payload;
        default:
            return initialState;
    }
};
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
export const selectedTokenDex = (initialState = DEX_INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_TOKENS_DEX:
            return action.payload;
        default:
            return initialState;
    }
};
export const handle_pay_values = (initialState = null, action) => {
    switch (action.type) {
        case HANDLE_TOKEN_VALUE_DEX:
            return action.payload;
        default:
            return initialState;
    }
};
export const DEX_INITIAL_DATA = {
    token1_price: 0,
    token2_price: 0,
    convertedValue: 0,
    rate: 0,
    tokenBalance: 0,
};
export const convert_pay_values = (
    initialState = {
        success: false,
        data: DEX_INITIAL_DATA,
    },
    action
) => {
    switch (action.type) {
        case 'CONVERT_TOKEN_VALUE_DEX':
            return action.payload;
        default:
            return initialState;
    }
};
export const convert_tokens = (initialState = '', action) => {
    switch (action.type) {
        case SWAP_TOKENS:
            return action.payload;
        default:
            return initialState;
    }
};
export const getPriceImpact = (initialState = 0, action) => {
    switch (action.type) {
        case PRICE_IMPACT:
            return action.payload;
        default:
            return initialState;
    }
};
