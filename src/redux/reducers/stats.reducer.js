import { TOKEN_INFO } from '../actions/index.action';
const tokenData = {
    price: 0,
    tvl: 0,
    supply: 0,
    marketCap: 0,
};
export const tokenInfo = (intialState = tokenData, action) => {
    switch (action.type) {
        case TOKEN_INFO:
            return action.payload;
        default:
            return intialState;
    }
};
