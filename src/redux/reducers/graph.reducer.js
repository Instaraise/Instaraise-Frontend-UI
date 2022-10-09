import { GRAPH_TYPE, Num_of_days, PRICE_GRAPH } from '../actions/index.action';

export const priceGraph = (
    intialState = { pricedata: [], volumedata: [] },
    action
) => {
    switch (action.type) {
        case PRICE_GRAPH:
            return action.payload;
        default:
            return intialState;
    }
};
export const selectedNoDays = (intialState = 1, action) => {
    switch (action.type) {
        case Num_of_days:
            return action.payload;
        default:
            return intialState;
    }
};
export const selectedGraphType = (intialState = 'price', action) => {
    switch (action.type) {
        case GRAPH_TYPE:
            return action.payload;
        default:
            return intialState;
    }
};
