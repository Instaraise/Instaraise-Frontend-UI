import {
    FETCH_FARMS_DATA,
    FETCH_FARMS_STAKED_DATA,
    FETCH_INSTA_REWARDS_FARM,
    FETCH_USER_FARMS_BALANCE,
    STAKE_INSTA_FARMS,
    UNSTAKE_INSTA_FARMS,
} from '../../actions/index.action';
const fetchFarmStakedData_ISTATE = {
    balance: 0,
    singularStakes: [],
};
const farmDetail = {
    identifier: 'INSTA / XTZ LP',
    APR: 0,
    totalLiquidty: 0,
    rewardRate: 0,
};
export const fetchFarmDetails = (initialState = farmDetail, action) => {
    switch (action.type) {
        case FETCH_FARMS_DATA:
            return action.payload;
        default:
            return initialState;
    }
};

export const fetchFarmStakedData = (
    initialState = fetchFarmStakedData_ISTATE,
    action
) => {
    switch (action.type) {
        case FETCH_FARMS_STAKED_DATA:
            return action.payload;

        default:
            return initialState;
    }
};
export const fetchInstaRewards = (initialState = 0, action) => {
    switch (action.type) {
        case FETCH_INSTA_REWARDS_FARM:
            return action.payload;

        default:
            return initialState;
    }
};
export const fetchUserBalance = (initialState = 0, action) => {
    switch (action.type) {
        case FETCH_USER_FARMS_BALANCE:
            return action.payload;

        default:
            return initialState;
    }
};
export const stakeInstaFarms = (initialState = 0, action) => {
    switch (action.type) {
        case STAKE_INSTA_FARMS:
            return action.payload;

        default:
            return initialState;
    }
};
export const unstakeInstaFarms = (initialState = 0, action) => {
    switch (action.type) {
        case UNSTAKE_INSTA_FARMS:
            return action.payload;

        default:
            return initialState;
    }
};
