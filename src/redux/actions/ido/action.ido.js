// eslint-disable-next-line
import {
    FetchSaleDataAPI,
    ParticipateInSaleDataAPI,
    claimSaleAPI,
} from './api.ido';
import {
    CLAIM_SALE,
    FETCH_SALE_DATA,
    PARTICIPATE_IN_SALE,
} from '../index.action';

export const FetchSaleData = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await FetchSaleDataAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: FETCH_SALE_DATA,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: FETCH_SALE_DATA,
                payload: API_RESPONSE,
            });
        }
    };
};

export const ParticipateInSale = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await ParticipateInSaleDataAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: PARTICIPATE_IN_SALE,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: PARTICIPATE_IN_SALE,
                payload: API_RESPONSE,
            });
        }
    };
};

export const claimNow = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await claimSaleAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: CLAIM_SALE,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: CLAIM_SALE,
                payload: API_RESPONSE,
            });
        }
    };
};
