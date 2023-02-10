import { kycProcessAPI } from './api.price';
import { STEPPER_STATE } from '../index.action';
export const kycProcess = (args) => {
    return async (dispatch) => {
        const API_RESP = await kycProcessAPI(args);
        if (API_RESP.success) {
            dispatch({
                type: STEPPER_STATE,
                payload: API_RESP.data,
            });
        } else {
            dispatch({
                type: STEPPER_STATE,
                payload: API_RESP.data,
            });
        }
    };
};
