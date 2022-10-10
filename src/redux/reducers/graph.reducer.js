import { NUM_OF_DAYS, PRICE_GRAPH } from '../actions/index.action';

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
        case NUM_OF_DAYS:
            return action.payload;
        default:
            return intialState;
    }
};
