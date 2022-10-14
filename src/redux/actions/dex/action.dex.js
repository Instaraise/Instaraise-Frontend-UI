import { SELECT_NETWORK } from '../index.action';

export const SELECT_NETWORK_TYPE = (data) => {
    return async (dispatch) => {
        return dispatch({
            type: SELECT_NETWORK.toUpperCase(),
            payload: data,
        });
    };
};
