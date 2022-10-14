import { SELECT_NETWORK } from '../../actions/index.action';
export const selectNetwork = (initialState = 'TESTNET', action) => {
    switch (action.type) {
        case SELECT_NETWORK:
            return action.payload;
        default:
            return initialState;
    }
};
