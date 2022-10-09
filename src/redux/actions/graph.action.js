import { fetchGraphData } from './api.graph';
import { GRAPH_TYPE, Num_of_days, PRICE_GRAPH } from './index.action';
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
        type: Num_of_days,
        payload: payload,
    };
};
export const graphType = (payload) => {
    return {
        type: GRAPH_TYPE,
        payload: payload,
    };
};
