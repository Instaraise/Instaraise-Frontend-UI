import { fetchGraphData } from './api.graph';
import { NUM_OF_DAYS, PRICE_GRAPH } from './index.action';
export const priceGraph = (args) => {
    return async (dispatch) => {
        const API_RESP = await fetchGraphData(args);
        if (API_RESP.success) {
            dispatch({
                type: PRICE_GRAPH,
                payload: API_RESP.data,
            });
        } else {
            dispatch({
                type: PRICE_GRAPH,
                payload: API_RESP.data,
            });
        }
    };
};
export const numberOfDays = (payload) => {
    return {
        type: NUM_OF_DAYS,
        payload: payload,
    };
};
