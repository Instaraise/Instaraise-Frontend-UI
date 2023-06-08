import axios from 'axios';

import { COINGECKO_API_URL } from '../../config/config';
export const fetchGraphData = async ({ days }) => {
    try {
        let API_URL;
        if (days === 1) {
            API_URL = `${COINGECKO_API_URL}?vs_currency=usd&days=${days}`;
        } else {
            API_URL = `${COINGECKO_API_URL}?vs_currency=usd&days=${days}&interval=daily`;
        }
        const response = await axios.get(API_URL);
        // if (days === 1) {
        //     pricedata = response.data.body.prices.map((item) => {
        //         const data = {
        //             name: new Date(item[0]).getHours(),
        //             pv: item[1],
        //         };
        //         return data;
        //     });
        // } else {
        //     pricedata = response.data.body.prices.map((item) => {
        //         const data = {
        //             name: new Date(item[0]).getDate(),
        //             pv: item[1],
        //         };
        //         return data;
        //     });
        // }
        let pricedata = response.data.body.prices.map((item) => {
            const data = {
                name: new Date(item[0]),
                pv: item[1],
            };
            return data;
        });
        return {
            success: true,
            data: {
                pricedata: pricedata,
            },
        };
    } catch (error) {
        return {
            success: true,
            data: {
                pricedata: [],
            },
        };
    }
};
