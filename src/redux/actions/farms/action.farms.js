// eslint-disable-next-line
import { GetHarvestValueAPI, fetchLpBalanceApi } from './api.balance';
import { getFarmsDataAPI } from './api.farms';
import {
    claimInstaRewardsApi,
    getStakedAmount,
    stakeInstaAPI,
} from './api.stake-farms';
import { unStakeApi } from './api.unstake-farms';
import {
    CLAIM_FARMS_INSTA_REWARDS,
    FETCH_FARMS_DATA,
    FETCH_FARMS_STAKED_DATA,
    FETCH_INSTA_REWARDS_FARM,
    FETCH_USER_FARMS_BALANCE,
    STAKE_INSTA_FARMS,
    UNSTAKE_INSTA_FARMS,
} from '../index.action';

export const FetchFarmsData = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await getFarmsDataAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: FETCH_FARMS_DATA,
                payload: API_RESPONSE.response,
            });
        } else {
            return dispatch({
                type: FETCH_FARMS_DATA,
                payload: API_RESPONSE.response,
            });
        }
    };
};
export const FARM_STAKE_BAL_RESPONSE = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await getStakedAmount(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: FETCH_FARMS_STAKED_DATA,
                payload: API_RESPONSE.response,
            });
        } else {
            return dispatch({
                type: FETCH_FARMS_STAKED_DATA,
                payload: API_RESPONSE.response,
            });
        }
    };
};
export const FETCH_INSTA_REWARDS = (args) => {
    return async (dispatch) => {
        // args = FARMS_CONFIG[0]
        const API_RESPONSE = await GetHarvestValueAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: FETCH_INSTA_REWARDS_FARM,
                payload: API_RESPONSE.response,
            });
        } else {
            return dispatch({
                type: FETCH_INSTA_REWARDS_FARM,
                payload: API_RESPONSE.response,
            });
        }
    };
};
export const FARM_USER_BALANCE_RESPONSE = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await fetchLpBalanceApi(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: FETCH_USER_FARMS_BALANCE,
                payload: API_RESPONSE.response,
            });
        } else {
            return dispatch({
                type: FETCH_USER_FARMS_BALANCE,
                payload: API_RESPONSE.response,
            });
        }
    };
};
export const CLAIM_FARMS_REWARDS = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await claimInstaRewardsApi(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: CLAIM_FARMS_INSTA_REWARDS,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: CLAIM_FARMS_INSTA_REWARDS,
                payload: API_RESPONSE,
            });
        }
    };
};
export const STAKE_INSTA_RESPONSE = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await stakeInstaAPI(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: STAKE_INSTA_FARMS,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: STAKE_INSTA_FARMS,
                payload: API_RESPONSE,
            });
        }
    };
};
export const UNSTAKE_INSTA_RESPONSE = (args) => {
    return async (dispatch) => {
        const API_RESPONSE = await unStakeApi(args);
        if (API_RESPONSE.success) {
            return dispatch({
                type: UNSTAKE_INSTA_FARMS,
                payload: API_RESPONSE,
            });
        } else {
            return dispatch({
                type: UNSTAKE_INSTA_FARMS,
                payload: API_RESPONSE,
            });
        }
    };
};
