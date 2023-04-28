import {
    CLAIM_INSTA_REWARDS,
    FETCH_INSTA_BALANCE,
    GET_HARVEST_VALUE,
    STAKE_INSTA,
    STAKE_INSTA_LOADER,
    STAKING_DETAILS,
    UNSTAKE_INSTA,
} from '../../actions/index.action';
const staking = {
    TVL: 0,
    APR: 0,
    APY: 0,
    poolWeightedScore: 0,
    currentTier: 'None',
    currentBlockLevel: 0,
    stakedamount: 0,
    stakings: [],
};

export const stakingDetails = (initialState = staking, action) => {
    switch (action.type) {
        case STAKING_DETAILS:
            return action.payload;
        default:
            return initialState;
    }
};

export const getHarvestValue = (initialState = 0, action) => {
    switch (action.type) {
        case GET_HARVEST_VALUE:
            return action.payload;
        default:
            return initialState;
    }
};

export const fetchBalanceDetails = (initialState = 0, action) => {
    switch (action.type) {
        case FETCH_INSTA_BALANCE:
            return action.payload;
        default:
            return initialState;
    }
};

export const claimInstaRewards = (initialState = 0, action) => {
    switch (action.type) {
        case CLAIM_INSTA_REWARDS:
            return action.payload;
        default:
            return initialState;
    }
};

export const stakeInsta = (initialState = 0, action) => {
    switch (action.type) {
        case STAKE_INSTA:
            return action.payload;
        default:
            return initialState;
    }
};
export const stakeInstaLoader = (initialState = false, action) => {
    switch (action.type) {
        case STAKE_INSTA_LOADER:
            return action.payload;
        default:
            return initialState;
    }
};
export const unstakeInsta = (initialState = 0, action) => {
    switch (action.type) {
        case UNSTAKE_INSTA:
            return action.payload;
        default:
            return initialState;
    }
};
