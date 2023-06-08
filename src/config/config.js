import { CONTRACT_CONFIG, testnetNetwork } from './network.config';
export const WALLET_NETWORK = 'mainnet';
export const NAME = 'Instaraise';
export const DEX_NETWORK = testnetNetwork;
export const DATA_URL =
    'https://ssuv8jnind.execute-api.us-east-2.amazonaws.com';
export const DEX_FEE = 1;
export const DEX_DATA_REFRESH_TIME = 60000;
export const NETWORK = 'mainnet';
export const RPC_NODES = {
    testnet: CONTRACT_CONFIG[testnetNetwork].RPC,
    mainnet: 'https://mainnet.smartpy.io',
};
export const TZKT_NODES = {
    mainnet: 'https://api.tzkt.io',
    testnet: CONTRACT_CONFIG[testnetNetwork].TZKT_NODE,
};
export const DEX_ADDRESS = CONTRACT_CONFIG[testnetNetwork].TOKEN_ADDRESS;
export const API = {
    url: 'https://api.coingecko.com/api/v3/coins/tezos?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false',
    API_KEY: '4824FE50-DB6E-4316-B099-72283C964891',
    tezToolTokenPrice: 'https://api.teztools.io/token/prices',
};
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
export const WITHDRAWFEES = [
    {
        STAKE_DURATION: 'Week 1',
        BLOCK_COUNT: 20160,
        WITHDRAWAL_FEE: 20,
    },
    {
        STAKE_DURATION: 'Week 2',
        BLOCK_COUNT: 40320,
        WITHDRAWAL_FEE: 10,
    },
    {
        STAKE_DURATION: '> Week 2 ',
        BLOCK_COUNT: 60480,
        WITHDRAWAL_FEE: 4,
    },
];
export const FARMS_WITHDRAWFEES = [
    {
        STAKE_DURATION: 'Week 1',
        BLOCK_COUNT: 20160,
        WITHDRAWAL_FEE: 20,
    },
    {
        STAKE_DURATION: 'Week 2',
        BLOCK_COUNT: 40320,
        WITHDRAWAL_FEE: 10,
    },
    {
        STAKE_DURATION: '> Week 2 ',
        BLOCK_COUNT: 60480,
        WITHDRAWAL_FEE: 4,
    },
];
