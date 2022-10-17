import { DEX_NETWORK } from '../config';
import { CONTRACT_CONFIG } from '../network.config';
import ctex_Img from '../../assets/dex/ctez.png';
import dogami_Img from '../../assets/dex/dogami.jpeg';
import kusd_Img from '../../assets/dex/kusd2.png';
import plenty_Img from '../../assets/dex/plenty.jpeg';
import usdtz_Img from '../../assets/dex/usdtz.png';
import uUSD_Img from '../../assets/dex/uUSD.png';
import Insta_Img from '../../assets/images/INSTA.png';
export const DEX_TOKEN_CONFIG = [
    {
        id: 5,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK].TOKEN_ADDRESS,
        DEX_ADDRESS: 'INSTA',
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK].INSTA_TOKEN_TYPE,
        TOKEN_ID: '0',
        DECIMALS: '9',
        TOKEN_NAME: 'insta',
        TOKEN_SYMBOL: 'INSTA',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK].TOKEN_ADDRESS}/storage`,
        TOKEN_LOGO: Insta_Img,
    },
    {
        id: 0,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][2].TOKEN_ADDRESS,
        DEX_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][2].CONVERTER,
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK][2].type,
        TOKEN_ID: '2',
        DECIMALS: '12',
        TOKEN_NAME: 'uusd',
        BIG_MAP: '18451',
        TOKEN_SYMBOL: 'uUSD',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK][2].CONVERTER}/storage`,
        TOKEN_LOGO: uUSD_Img,
    },
    {
        id: 1,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][3].TOKEN_ADDRESS,
        DEX_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][3].CONVERTER,
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK][3].type,
        TOKEN_ID: '3',
        DECIMALS: '5',
        TOKEN_NAME: 'doga',
        BIG_MAP: '18451',
        TOKEN_SYMBOL: 'DOGA',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK][3].CONVERTER}/storage`,
        TOKEN_LOGO: dogami_Img,
    },
    {
        id: 2,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][1].TOKEN_ADDRESS,
        DEX_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][1].CONVERTER,
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK][1].type,
        TOKEN_ID: '1',
        DECIMALS: '18',
        BIG_MAP: '18451',
        TOKEN_NAME: 'plenty',
        TOKEN_SYMBOL: 'PLENTY',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK][1].CONVERTER}/storage`,
        TOKEN_LOGO: plenty_Img,
    },
    {
        id: 3,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][4].TOKEN_ADDRESS,
        DEX_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][4].CONVERTER,
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK][4].type,
        TOKEN_ID: '4',
        DECIMALS: '18',
        TOKEN_NAME: 'kusd',
        BIG_MAP: '18451',
        TOKEN_SYMBOL: 'kUSD',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK][4].CONVERTER}/storage`,
        TOKEN_LOGO: kusd_Img,
    },
    {
        id: 4,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][5].TOKEN_ADDRESS,
        DEX_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][5].CONVERTER,
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK][5].type,
        TOKEN_ID: '5',
        DECIMALS: '6',
        TOKEN_NAME: 'ctez',
        BIG_MAP: '18451',
        TOKEN_SYMBOL: 'ctez',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK][5].CONVERTER}/storage`,
        TOKEN_LOGO: ctex_Img,
    },
    {
        id: 6,
        TOKEN_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][0].TOKEN_ADDRESS,
        DEX_ADDRESS: CONTRACT_CONFIG[DEX_NETWORK][0].CONVERTER,
        TOKEN_TYPE: CONTRACT_CONFIG[DEX_NETWORK][0].type,
        TOKEN_ID: '0',
        DECIMALS: '6',
        TOKEN_NAME: 'USDtz',
        BIG_MAP: '18451',
        TOKEN_SYMBOL: 'USDtz',
        TOKEN_URL: `https://better-call.dev/${DEX_NETWORK}/${CONTRACT_CONFIG[DEX_NETWORK][0].CONVERTER}/storage`,
        TOKEN_LOGO: usdtz_Img,
    },
];
