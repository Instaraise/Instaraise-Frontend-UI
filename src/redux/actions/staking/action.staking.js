// eslint-disable-next-line
import {
    GetHarvestValueAPI,
    claimInstaRewardsApi,
    fetchInstaBalanceApi,
    fetchInstaStorageApi,
    stakeInstaAPI,
    unStakeApi,
} from './api.staking';
import {
    CLAIM_INSTA_REWARDS,
    FETCH_INSTA_BALANCE,
    GET_HARVEST_VALUE,
    STAKE_INSTA,
    STAKING_DETAILS,
    UNSTAKE_INSTA,
} from '../index.action';

export const stakeInsta = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await stakeInstaAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: STAKE_INSTA,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: STAKE_INSTA,
                payload: API_RESPONSE,
            });
        }
    };
};

export const unStakeInsta = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await unStakeApi(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: UNSTAKE_INSTA,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: UNSTAKE_INSTA,
                payload: API_RESPONSE,
            });
        }
    };
};

export const fetchInstaStorage = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await fetchInstaStorageApi(args);

        if (API_RESPONSE.success) {
            return dispatch({
                type: STAKING_DETAILS,
                payload: API_RESPONSE.data,
            });
        } else {
            return dispatch({
                type: STAKING_DETAILS,
                payload: API_RESPONSE.data,
            });
        }
    };
};

export const fetchInstaBalance = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await fetchInstaBalanceApi(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: FETCH_INSTA_BALANCE,
                payload: API_RESPONSE.response,
            });
        } else {
            return dispatch({
                type: FETCH_INSTA_BALANCE,
                payload: API_RESPONSE.response,
            });
        }
    };
};

export const claimInstaRewards = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await claimInstaRewardsApi(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: CLAIM_INSTA_REWARDS,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: CLAIM_INSTA_REWARDS,
                payload: API_RESPONSE,
            });
        }
    };
};

export const GetHarvestValue = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await GetHarvestValueAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: GET_HARVEST_VALUE,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: GET_HARVEST_VALUE,
                payload: API_RESPONSE,
            });
        }
    };
};
