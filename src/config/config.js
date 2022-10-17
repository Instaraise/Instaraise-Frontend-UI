import { CONTRACT_CONFIG, testnetNetwork } from './network.config';
export const COINGECKO_API_URL =
    'https://2i1sxihk0h.execute-api.us-east-2.amazonaws.com/v1/market_chart';
export const WALLET_NETWORK = 'mainnet';
export const NAME = 'Instaraise';
export const DEX_NETWORK = testnetNetwork;
export const TOKEN_DATA_URL =
    'https://01yilewb14.execute-api.us-east-2.amazonaws.com';
export const DEX_DATA_REFRESH_TIME = 60000;
export const RPC_NODES = {
    testnet: CONTRACT_CONFIG[testnetNetwork].RPC,
    mainnet: 'https://mainnet.smartpy.io',
};
export const DEX_ADDRESS = CONTRACT_CONFIG[testnetNetwork].TOKEN_ADDRESS;
export const STAKES = {
    INSTA: {
        ACTIVE: {
            STAKING_CONTRACT: 'KT1R1NH37jmCJerta1wjih2jxVndkJxnyjHZ',
            BIG_MAP_KEY: '13802',
            CONTRACT_BIG_MAP: '17660',
            DECIMAL: 9,
            DEX_CONTRACT: 'KT1UzjhUhau9g5MjPxKUzM6KRJNwdW1oo52G',
            TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
        },
        IN_ACTIVE: {
            STAKING_CONTRACT: 'KT19mJDbL8EKTwQBxMQ6tssrJwzp3iBRkWm3',
            BIG_MAP_KEY: '13802',
            CONTRACT_BIG_MAP: '16926',
            DECIMAL: 9,
            DEX_CONTRACT: 'KT1UzjhUhau9g5MjPxKUzM6KRJNwdW1oo52G',
            TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
        },
    },
};
