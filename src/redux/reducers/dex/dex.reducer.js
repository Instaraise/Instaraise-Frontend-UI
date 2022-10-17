import { SELECT_NETWORK, TOKEN_STATS_DATA } from '../../actions/index.action';
export const selectNetwork = (initialState = 'TESTNET', action) => {
    switch (action.type) {
        case SELECT_NETWORK:
            return action.payload;
        default:
            return initialState;
    }
};
export const getTokenData = (
    initialState = {
        success: false,
        data: [],
        error: null,
    },
    action
) => {
    switch (action.type) {
        case TOKEN_STATS_DATA:
            return action.payload;
        default:
            return initialState;
    }
};
