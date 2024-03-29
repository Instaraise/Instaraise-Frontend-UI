import AQARCHAIN_ICON from '../../../assets/Ido/Aquachain_Img.jpeg';
import LYZI_LOGO from '../../../assets/Ido/Lyzi_Img.png';
import SHUTTLE_ONE_ICON from '../../../assets/Ido/ShuttleOne_Img.jpeg';
import INSTA_LOGO from '../../../assets/images/INSTA.png';
export const POOL_ADDRESS = {
    goeureka: {
        TOKEN_ADDRESS: 'KT1GioMCKwRyWoQpdrwxvsPVEsFJkkLyquVZ',
        POOL_ADDRESS: 'KT1XLh52wmX4eX2ZvzCN1gqtZNDYbeT7v3nV',
    },
    'instaraise-private': {
        TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
        POOL_ADDRESS: 'KT1JzMRLtEvrjxZEEftr8US24sQojb2PVpk6',
    },
    'instaraise-public': {
        TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
        POOL_ADDRESS: 'KT1MrvrYQg3PASJNae5w349dxqn6DtKov1J8',
    },
    aqarchain: {
        TOKEN_ADDRESS: 'KT19wuExNXayErfuCkcy6Z56cd1FWzF96xXk',
        POOL_ADDRESS: 'KT1KeKqrvtMujUGdrkwxhtuyVSqNBHPZnoyt',
    },
    shuttleone: {
        TOKEN_ADDRESS: 'KT1WzRVUnrJ4mNu59m9hPQZDY8Nq9JWtUbRf',
        POOL_ADDRESS: 'KT1JLUXnNWjj92KA7KgPXMEzgPCgfSUnL9DX',
    },
    lyzi: {
        TOKEN_ADDRESS: 'KT1UMx7aZQWNKY9nC4LRYNsueEiGMfpcQhhD',
        POOL_ADDRESS: 'KT1M8PQn1vydBu4BYGypjeNzjfjzqdtHdDU4',
    },
};
export const IDO_CONFIG = [
    {
        DISABLED: true,
        ALIAS: 'lyzi',
        PROJECT_NAME: 'Lyzi',
        TOKEN_NAME: 'LYZI',
        TELEGRAM: 'https://t.me/Lyzi_us',
        TYPE: 'Upcoming',
        DESCRIPTION: `🇨🇵 Pay limitless with +25 crypto in +1500 shops 💸 Get cashback up to 1% to 5% with $LYZI`,
        TOKEN_ADDRESS: 'KT1UMx7aZQWNKY9nC4LRYNsueEiGMfpcQhhD',
        POOL_ADDRESS: 'KT1M8PQn1vydBu4BYGypjeNzjfjzqdtHdDU4',
        ENROLLMENT_KEY: '441853',
        SALE_MAP_KEY: '441852',
        ADMIN: 'tz1VRTputDyDYy4GjthJqdabKDVxkD3xCYGc',
        WEBSITE: 'https://lyzi.fr/',
        WHITEPAPER:
            'https://lyzi.fr/wp-content/uploads/2023/01/Lyzi-Whitepaper-EN.pdf',
        TWITTER: 'https://twitter.com/Lyzi_app',
        ICON: LYZI_LOGO,
        MEDIUM: 'https://discord.com/invite/lyzi-app',
        START_TIME: '2023-05-05T09:00:00Z',
        END_TIME: '2023-05-09T09:00:00Z',
        SALE_TYPE: 'Public Sale',
        SOCIAL_HANDLES: {
            WEBSITE: 'https://lyzi.fr/',
            WHITEPAPER:
                'https://lyzi.fr/wp-content/uploads/2023/01/Lyzi-Whitepaper-EN.pdf',
            TWITTER: 'https://twitter.com/Lyzi_app',
            MEDIUM: 'https://discord.com/invite/lyzi-app',
            TELEGRAM: 'https://t.me/Lyzi_us',
        },
        AMOUNT_OF_TOKENS_TO_SELL: 1000000,
        FCFS_TOTAL_RAISE: '33250',
        FCFS_MIN_ALLOCATION: '100 xtz',
        FCFS_MAX_ALLOCATION: '30000 xtz',
        FCFS_OPEN_TIME: '2023-05-05T09:00:00Z',
        FCFS_SWAP_RATE: '',
        TOKEN_PRICE: 0.133,
        DISCOUNTED_PRICE: 0.133,
        MIN_ALLOCATION: 'TBA',
        MAX_ALLOCATION: 'TBA',
        AMOUNT_TO_RAISE: 33250,
        DECIMALS: 6,
        WHITELIST_LINK: 'https://bit.ly/3k7KOAa',
        TOKEN_INFO:
            'It should be noted that 100% of LYZI will be unlocked at TGE',
        CURRENCY: 'USD',
        MULTI_SWAP_RATE: false,
        DISABLE_SWAP_RATE: false,
        SWAP_RATE_NON_FCFS: `1 XTZ = ${(1 / 0.133).PrecisionMaker(2)} LYZI`,
        SUB_CURRENCY: '',
        TEZ: 'xtz',
        XTZ_PRICE: 21560,
        TOKEN_UNLOCK_TIME: '2023-05-09T10:00:00Z',
        LISTING_PRICE: '0.133',
        TIER_SYSTEM: false,
    },
    {
        DISABLED: false,
        ALIAS: 'shuttleone',
        PROJECT_NAME: 'ShuttleOne',
        TOKEN_NAME: 'SZO',
        TELEGRAM: 'https://t.me/shuttleone',
        TYPE: 'Finished',
        DESCRIPTION: `ShuttleOne connects interoperable digital infrastructure by building tools that aggregate crypto to the real world.`,
        TOKEN_ADDRESS: 'KT1WzRVUnrJ4mNu59m9hPQZDY8Nq9JWtUbRf',
        POOL_ADDRESS: 'KT1JLUXnNWjj92KA7KgPXMEzgPCgfSUnL9DX',
        ENROLLMENT_KEY: '53625',
        SALE_MAP_KEY: '53624',
        ADMIN: 'tz1fa9yiKr11zUkggL6rNh71JYCb9Et95Bg3',
        WEBSITE: 'https://shuttleone.network/2021/#/home',
        WHITEPAPER:
            'https://github.com/shuttle-one/flyshuttleone/blob/aa142fd38305a15fbcc405dda638ebba25b0a173/ShuttleOne%20Litepaper%20August%202020.pdf',
        TWITTER: 'https://twitter.com/shuttle_one',
        ICON: SHUTTLE_ONE_ICON,
        MEDIUM: 'https://shuttleone.medium.com/',
        START_TIME: '2021-12-12T12:00:00Z',
        END_TIME: '2021-12-13T12:00:00Z',
        SALE_TYPE: 'Public Sale',
        SOCIAL_HANDLES: {
            WEBSITE: 'https://shuttleone.network/2021/#/home',
            WHITEPAPER:
                'https://github.com/shuttle-one/flyshuttleone/blob/aa142fd38305a15fbcc405dda638ebba25b0a173/ShuttleOne%20Litepaper%20August%202020.pdf',
            TWITTER: 'https://twitter.com/shuttle_one',
            MEDIUM: 'https://shuttleone.medium.com/',
            TELEGRAM: 'https://t.me/shuttleone',
        },
        AMOUNT_OF_TOKENS_TO_SELL: 1000000,
        FCFS_TOTAL_RAISE: '17381',
        FCFS_MIN_ALLOCATION: '50 xtz',
        FCFS_MAX_ALLOCATION: '500 xtz',
        FCFS_OPEN_TIME: '2021-12-13T00:00:00Z',
        FCFS_SWAP_RATE: '',
        TOKEN_PRICE: 0.05,
        DISCOUNTED_PRICE: 0.05,
        MIN_ALLOCATION: 'TBA',
        MAX_ALLOCATION: 'TBA',
        AMOUNT_TO_RAISE: 120000,
        DECIMALS: 6,
        WHITELIST_LINK: 'https://bit.ly/3k7KOAa',
        TOKEN_INFO:
            'It should be noted that 100% of SZO will be unlocked at TGE',
        CURRENCY: 'USD',
        MULTI_SWAP_RATE: true,
        DISABLE_SWAP_RATE: false,
        SWAP_RATE_NON_FCFS: `1 XTZ = ${(1 / 0.026).PrecisionMaker(2)} SZO`,
        SWAP_RATE_FCFS: `1 XTZ = ${(1 / 0.031).PrecisionMaker(2)} SZO`,
        SUB_CURRENCY: '',
        TEZ: 'xtz',
        XTZ_PRICE: 21560,
        TOKEN_UNLOCK_TIME: '2021-12-13T13:00:00Z',
        LISTING_PRICE: '0.034',
    },
    {
        DISABLED: false,
        ALIAS: 'aqarchain',
        PROJECT_NAME: 'Aqarchain',
        TOKEN_NAME: 'AQRTz',
        TELEGRAM: 'https://t.me/aqrxtoken',
        TYPE: 'Finished',
        DESCRIPTION: `World's first decentralised marketplace for real estate NFT’s, digitising the real estate industry with an end to end platform that enables seamless online experience for the users.`,
        TOKEN_ADDRESS: 'KT19wuExNXayErfuCkcy6Z56cd1FWzF96xXk',
        POOL_ADDRESS: 'KT1KeKqrvtMujUGdrkwxhtuyVSqNBHPZnoyt',
        ENROLLMENT_KEY: '20874',
        SALE_MAP_KEY: '20873',
        ADMIN: 'tz1fa9yiKr11zUkggL6rNh71JYCb9Et95Bg3',
        WEBSITE: 'https://aqarchain.io/',
        WHITEPAPER: 'https://smartchain.medium.com/',
        TWITTER: 'https://twitter.com/aqarchain_io',
        ICON: AQARCHAIN_ICON,
        MEDIUM: 'https://smartchain.medium.com/',
        START_TIME: '2021-10-20T12:00:00Z',
        END_TIME: '2021-10-21T12:00:00Z',
        SALE_TYPE: 'Public Sale',
        SOCIAL_HANDLES: {
            WEBSITE: 'https://aqarchain.io/',
            WHITEPAPER: 'https://smartchain.medium.com/',
            TWITTER: 'https://twitter.com/aqarchain_io',
            MEDIUM: 'https://smartchain.medium.com/',
            TELEGRAM: 'https://t.me/aqrxtoken',
        },
        AMOUNT_OF_TOKENS_TO_SELL: 1000000,
        FCFS_TOTAL_RAISE: 'TBA',
        FCFS_MIN_ALLOCATION: '10 xtz',
        FCFS_MAX_ALLOCATION: '500 xtz',
        FCFS_OPEN_TIME: '2021-10-21T00:00:00Z',
        TOKEN_PRICE: 0.05,
        DISCOUNTED_PRICE: 0.05,
        MIN_ALLOCATION: 'TBA',
        MAX_ALLOCATION: 'TBA',
        AMOUNT_TO_RAISE: 50000,
        DECIMALS: 14,
        WHITELIST_LINK: 'https://bit.ly/3k7KOAa',
        TOKEN_INFO:
            'It should be noted that 50% of AQRTz tokens will be unlocked after the sale and rest 50% at a monthly drip of 6 months',
        CURRENCY: 'USD',
        SUB_CURRENCY: '',
        MULTI_SWAP_RATE: false,
        DISABLE_SWAP_RATE: false,
        SWAP_RATE_NON_FCFS: '',
        SWAP_RATE_FCFS: '',
        TEZ: 'xtz',
        XTZ_PRICE: 21560,
        LISTING_PRICE: '0.05',
        TOKEN_UNLOCK_TIME: '2021-10-21T14:00:00Z',
    },
    {
        DISABLED: true,
        ALIAS: 'instaraise-public',
        PROJECT_NAME: 'Instaraise',
        TOKEN_NAME: 'INSTA',
        TELEGRAM: 'https://t.co/ktI6vO3gOM?amp=1',
        TYPE: 'Finished',
        DESCRIPTION: `Tezos first ever completely decentralised Fundraising and Incubation platform. We aim to empower projects with fundraising ability while developing loyal users, at the same time, allowing retailer investors and potential users to access early investment deals.`,
        TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
        POOL_ADDRESS: 'KT1MrvrYQg3PASJNae5w349dxqn6DtKov1J8',
        ADMIN: 'tz1fa9yiKr11zUkggL6rNh71JYCb9Et95Bg3',
        WEBSITE: 'https://www.instaraise.io/',
        WHITEPAPER: 'https://docs.instaraise.io',
        TWITTER: 'https://twitter.com/instaraise',
        ICON: INSTA_LOGO,
        SOCIAL_HANDLES: {
            WEBSITE: 'https://www.instaraise.io/',
            WHITEPAPER: 'https://docs.instaraise.io',
            TWITTER: 'https://twitter.com/instaraise',
            MEDIUM: 'https://instaraise.medium.com',
            TELEGRAM: 'https://t.co/ktI6vO3gOM?amp=1',
        },
        MEDIUM: 'https://instaraise.medium.com',
        START_TIME: '2021-09-09T14:00:00Z',
        END_TIME: '2021-09-11T14:00:00Z',
        SALE_TYPE: 'Public Sale',
        AMOUNT_OF_TOKENS_TO_SELL: 1000000,
        TOKEN_PRICE: 0.022,
        DISCOUNTED_PRICE: 0.022,
        MIN_ALLOCATION: 50,
        MAX_ALLOCATION: 2000,
        AMOUNT_TO_RAISE: 21560,
        DECIMALS: 1,
        WHITELIST_LINK: 'https://bit.ly/3k7KOAa',
        TOKEN_INFO:
            'It should be noted that 100% of $INSTA tokens purchased in public sale will be released on Listing.',
        CURRENCY: 'xtz',
        SUB_CURRENCY: 'xtz',
        MULTI_SWAP_RATE: false,
        DISABLE_SWAP_RATE: false,
        SWAP_RATE_NON_FCFS: '',
        SWAP_RATE_FCFS: '',
        XTZ_PRICE: 21560,
        TEZ: 'xtz',
        TOKEN_UNLOCK_TIME: '2021-09-15T14:00:00Z',
    },
    {
        DISABLED: true,
        ALIAS: 'instaraise-private',
        PROJECT_NAME: 'Instaraise',
        TOKEN_NAME: 'INSTA',
        TELEGRAM: 'https://t.co/ktI6vO3gOM?amp=1',
        TYPE: 'Finished',
        DESCRIPTION: `Tezos first ever completely decentralised Fundraising and Incubation platform. We aim to empower projects with fundraising ability while developing loyal users, at the same time, allowing retailer investors and potential users to access early investment deals.`,
        TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
        POOL_ADDRESS: 'KT1JzMRLtEvrjxZEEftr8US24sQojb2PVpk6',
        ADMIN: 'tz1VRTputDyDYy4GjthJqdabKDVxkD3xCYGc',
        WEBSITE: 'https://www.instaraise.io/',
        WHITEPAPER: 'https://docs.instaraise.io',
        TWITTER: 'https://twitter.com/instaraise',
        ICON: INSTA_LOGO,
        MEDIUM: 'https://instaraise.medium.com',
        START_TIME: '2021-08-20T14:00:00Z',
        END_TIME: '2021-08-22T14:00:00Z',
        SALE_TYPE: 'Presale',
        AMOUNT_OF_TOKENS_TO_SELL: 1000000,
        SOCIAL_HANDLES: {
            WEBSITE: 'https://www.instaraise.io/',
            WHITEPAPER: 'https://docs.instaraise.io',
            TWITTER: 'https://twitter.com/instaraise',
            MEDIUM: 'https://instaraise.medium.com',
            TELEGRAM: 'https://t.co/ktI6vO3gOM?amp=1',
        },
        TOKEN_PRICE: 0.02043,
        DISCOUNTED_PRICE: 0.0184,
        MIN_ALLOCATION: 50,
        MAX_ALLOCATION: 5000,
        AMOUNT_TO_RAISE: 20000,
        DECIMALS: 1,
        WHITELIST_LINK: 'https://bit.ly/3k7KOAa',
        TOKEN_INFO:
            'It should be noted that 50% of $INSTA tokens purchased will be released once the IDO is complete and inital liquidity has been added and locked in Quipuswap. The remaining 50% will be released 45 days later.',
        CURRENCY: 'xtz',
        SUB_CURRENCY: 'xtz',
        MULTI_SWAP_RATE: false,
        DISABLE_SWAP_RATE: false,
        SWAP_RATE_NON_FCFS: '',
        SWAP_RATE_FCFS: '',
        XTZ_PRICE: 21560,
        TEZ: 'xtz',
        TOKEN_UNLOCK_TIME: '2021-09-15T14:00:00Z',
    },
];
