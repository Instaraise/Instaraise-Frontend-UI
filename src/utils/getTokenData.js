import { DEX_TOKEN_CONFIG } from '../config/DexConfig/dex.config';
import { DEX_INITIAL_STATE } from '../redux/reducers/dex/dex.reducer';

export const getTokenData = (to, from) => {
    const to_Data = DEX_TOKEN_CONFIG.find((token) => token.DEX_ADDRESS === to);
    const from_Data = DEX_TOKEN_CONFIG.find(
        (token) => token.TOKEN_SYMBOL === from
    );
    if (to_Data && from_Data) {
        return {
            to: {
                id: to_Data.id,
                TOKEN_ADDRESS: to_Data.TOKEN_ADDRESS,
                DEX_ADDRESS: to_Data.DEX_ADDRESS,
                TOKEN_TYPE: to_Data.TOKEN_TYPE,
                TOKEN_ID: to_Data.TOKEN_ID,
                DECIMALS: to_Data.DECIMALS,
                TOKEN_NAME: to_Data.TOKEN_NAME,
                TOKEN_SYMBOL: to_Data.TOKEN_SYMBOL,
                TOKEN_URL: to_Data.TOKEN_URL,
                TOKEN_LOGO: to_Data.TOKEN_LOGO,
            },
            from: {
                id: from_Data.id,
                TOKEN_ADDRESS: from_Data.TOKEN_ADDRESS,
                DEX_ADDRESS: from_Data.DEX_ADDRESS,
                TOKEN_TYPE: from_Data.TOKEN_TYPE,
                TOKEN_ID: from_Data.TOKEN_ID,
                DECIMALS: from_Data.DECIMALS,
                TOKEN_NAME: from_Data.TOKEN_NAME,
                TOKEN_SYMBOL: from_Data.TOKEN_SYMBOL,
                TOKEN_URL: from_Data.TOKEN_URL,
                TOKEN_LOGO: from_Data.TOKEN_LOGO,
            },
        };
    }

    if (!to_Data && !from_Data) {
        return DEX_INITIAL_STATE;
    }

    if (!to_Data) {
        return {
            to: {
                id: null,
                TOKEN_ADDRESS: null,
                DEX_ADDRESS: null,
                TOKEN_TYPE: null,
                TOKEN_ID: null,
                DECIMALS: null,
                TOKEN_NAME: null,
                TOKEN_SYMBOL: null,
                TOKEN_URL: null,
                TOKEN_LOGO: null,
            },
            from: {
                id: from_Data.id,
                TOKEN_ADDRESS: from_Data.TOKEN_ADDRESS,
                DEX_ADDRESS: from_Data.DEX_ADDRESS,
                TOKEN_TYPE: from_Data.TOKEN_TYPE,
                TOKEN_ID: from_Data.TOKEN_ID,
                DECIMALS: from_Data.DECIMALS,
                TOKEN_NAME: from_Data.TOKEN_NAME,
                TOKEN_SYMBOL: from_Data.TOKEN_SYMBOL,
                TOKEN_URL: from_Data.TOKEN_URL,
                TOKEN_LOGO: from_Data.TOKEN_LOGO,
            },
        };
    }
    if (!from_Data) {
        return {
            to: {
                id: to_Data.id,
                TOKEN_ADDRESS: to_Data.TOKEN_ADDRESS,
                DEX_ADDRESS: to_Data.DEX_ADDRESS,
                TOKEN_TYPE: to_Data.TOKEN_TYPE,
                TOKEN_ID: to_Data.TOKEN_ID,
                DECIMALS: to_Data.DECIMALS,
                TOKEN_NAME: to_Data.TOKEN_NAME,
                TOKEN_SYMBOL: to_Data.TOKEN_SYMBOL,
                TOKEN_URL: to_Data.TOKEN_URL,
                TOKEN_LOGO: to_Data.TOKEN_LOGO,
            },
            from: {
                id: null,
                TOKEN_ADDRESS: null,
                DEX_ADDRESS: null,
                TOKEN_TYPE: null,
                TOKEN_ID: null,
                DECIMALS: null,
                TOKEN_NAME: null,
                TOKEN_SYMBOL: null,
                TOKEN_URL: null,
                TOKEN_LOGO: null,
            },
        };
    }
};

export const checkValidTokenAddress = (to, from, search) => {
    const toExists = DEX_TOKEN_CONFIG.filter(
        (token) => token.DEX_ADDRESS === to
    )[0];
    const fromExists = DEX_TOKEN_CONFIG.filter(
        (token) => token.TOKEN_SYMBOL === from
    )[0];
    if (!toExists) {
        if (search.includes('to=')) {
            return {
                status: true,
                error: 'Enter a valid token address',
            };
        }
    }
    if (!fromExists) {
        return {
            status: true,
            error: 'Enter a valid token symbol',
        };
    }
    if (toExists && fromExists) {
        if (toExists.TOKEN_NAME === fromExists.TOKEN_NAME) {
            return {
                status: true,
                error: 'Cannot swap similar tokens',
            };
        }
    }

    return {
        status: false,
        error: null,
    };
};
