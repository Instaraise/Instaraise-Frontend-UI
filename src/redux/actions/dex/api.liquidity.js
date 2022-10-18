import axios from 'axios';

import { LIQUIDITY_DATA_URL } from '../../../config/config';
export const fetchPoolStats = async () => {
    try {
        const response = await axios.get(`${LIQUIDITY_DATA_URL}/v1/liquidity`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            data: [],
            error: error,
        };
    }
};
