import {
    FETCH_SALE_DATA,
    PARTICIPATE_IN_SALE,
} from '../../actions/index.action';
const fetchSaleInitialState = {
    success: false,
    data: {
        currentier: 'FCFS',
        allocation: 0,
        totalTokensSold: 0,
        totalXTZRaised: 0,
        totalPoolWeight: 0,
        IsWhitelistedUser: false,
        yourAllocation: 0,
        totalTokensToSell: 0,
        yourInvestments: [],
    },
};

export const fetchSaleData = (initialState = fetchSaleInitialState, action) => {
    switch (action.type) {
        case FETCH_SALE_DATA:
            return action.payload;
        default:
            return initialState;
    }
};

export const participateInSaleData = (initialState = 0, action) => {
    switch (action.type) {
        case PARTICIPATE_IN_SALE:
            return action.payload;
        default:
            return initialState;
    }
};
