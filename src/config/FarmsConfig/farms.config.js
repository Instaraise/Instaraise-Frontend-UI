import INSTA_LOGO from '../../assets/images/INSTA.png';
import TEZ_LOGO from '../../assets/images/XTZ.png';
export const FARMS_CONFIG = [
    {
        NAME: 'INSTA / XTZ LP',
        DEX_TYPE: 'Quipuswap LP',
        REWARD_TOKEN: ['INSTA'],
        TYPE: 'active',
        ICON_1: INSTA_LOGO,
        ICON_2: TEZ_LOGO,
        BUY_LINK:
            'https://quipuswap.com/liquidity/add/KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ_0-tez',
        PARAMS: {
            CONTRACT: 'KT1GbUaTFL3Ckp7sikwiGwu1BG6Er69vjmdp',
            MAP_ID: 42171,
            DECIMAL: 9,
            TOKEN_DECIMAL: 6,
            DEX: 'KT1UzjhUhau9g5MjPxKUzM6KRJNwdW1oo52G',
            TOKEN_ADDRESS: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
            LP_TOKEN: 'KT1Djh5319qpicVm8YwTSQgsMrAuWhmNBiGw',
            DEX_MAP_ID: 15778,
            LP_DECIMAL: 6,
        },
    },
];
