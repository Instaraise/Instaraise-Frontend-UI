import axios from 'axios';

import { TOKEN_STATS_API_URL } from '../../config/config';
export const tokenInfoAPI = async () => {
    try {
        const response = await axios.get(TOKEN_STATS_API_URL);
        if (response.data.success) {
            const price = response.data.body.insta_stats.price;
            const marketCap = Math.round(
                response.data.body.insta_stats.marketcap
            );
            const supply = Math.round(
                response.data.body.insta_stats.circulating_supply
            );
            const burned = (
                response.data.body.insta_stats.total_burned / 10000000000
            ).PrecisionMaker(2);
            const tvl = Math.round(response.data.body.tvl);
            return {
                success: true,
                data: {
                    price: price,
                    tvl: tvl,
                    marketCap: marketCap,
                    supply: supply,
                    burned: burned,
                },
            };
        } else {
            throw new Error(response);
        }
    } catch (error) {
        return {
            success: false,
            data: {
                price: 0,
                tvl: 0,
                marketCap: 0,
                supply: 0,
                burned: 0,
            },
        };
    }
};
