import { tokenInfoAPI } from './api.stats';
import { TOKEN_INFO } from './index.action';
export const tokenInfo = (args) => {
    return async (dispatch) => {
        const API_RESP = await tokenInfoAPI(args);
        if (API_RESP.success) {
            dispatch({
                type: TOKEN_INFO,
                payload: API_RESP.data,
            });
        } else {
            dispatch({
                type: TOKEN_INFO,
                payload: API_RESP.data,
            });
        }
    };
};
