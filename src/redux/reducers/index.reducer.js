// eslint-disable-next-line
import { combineReducers } from 'redux';

import {
    convert_pay_values,
    convert_tokens,
    getPriceImpact,
    getTokenData,
    handle_pay_values,
    selectNetwork,
    selectedTokenDex,
} from './dex/dex.reducer';
import {
    convert_pay_values_pools,
    getNetworkTokenLimit,
    getPoolData,
    getUserLiquidityPositions,
    handle_pay_values_pools,
    liquidityPositions,
    setLiquidityPoolPair,
    setStakedToken,
    tokenBalance,
} from './dex/liquidity.reducer';
import {
    fetchSaleData,
    participateInSaleData,
} from './projects/projects.reducer';
//farms
import {
    fetchFarmDetails,
    fetchFarmStakedData,
    fetchInstaRewards,
    fetchUserBalance,
    stakeInstaFarms,
    unstakeInstaFarms,
} from './farms/farms.reducer';
//staking
import {
    claimInstaRewards,
    fetchBalanceDetails,
    getHarvestValue,
    stakeInsta,
    stakeInstaLoader,
    stakingDetails,
    unstakeInsta,
} from './staking/staking.reducer';
import { KYC_PROCESS, stepperData } from './common/common.reducer';
import { priceGraph, selectedNoDays } from './graph.reducer';
import { fetchAllTrendingNews } from './news.reducer';
import { tokenInfo } from './stats.reducer';
import { walletAddress } from './wallet/wallet.reducer';
const rootReducer = combineReducers({
    allTrendingNews: fetchAllTrendingNews,
    tokenInfo: tokenInfo,
    priceGraph: priceGraph,
    selectedNoDays: selectedNoDays,
    wallet: walletAddress,
    selectedNetwork: selectNetwork,
    tokenStats: getTokenData,
    poolData: getPoolData,
    liquidityPair: setLiquidityPoolPair,
    handle_staked_amount_pools: handle_pay_values_pools,
    convert_staked_amount_pool: convert_pay_values_pools,
    kycProcess: KYC_PROCESS,
    stakedPair: setStakedToken,
    selectedToken: selectedTokenDex,
    handle_pay_values_market: handle_pay_values,
    tokenBalance: tokenBalance,
    convert_pay_values_market: convert_pay_values,
    convertTokens: convert_tokens,
    priceimpact: getPriceImpact,
    userLiquidityPositions: getUserLiquidityPositions,
    network_token_limit: getNetworkTokenLimit,
    liquidityPositions: liquidityPositions,
    //farms
    farmData: fetchFarmDetails,
    FarmStakedData: fetchFarmStakedData,
    fetchInstaRewards: fetchInstaRewards,
    fetchUserBalance: fetchUserBalance,
    stakeInstaFarms: stakeInstaFarms,
    unstakeInstaFarms: unstakeInstaFarms,
    //Stepper
    getSteps: stepperData,
    // project API
    fetchSaleData: fetchSaleData,
    participateInSaleData: participateInSaleData,
    //staking
    unstakeInsta: unstakeInsta,
    stakeInsta: stakeInsta,
    stakeInstaLoader: stakeInstaLoader,
    getHarvestValue: getHarvestValue,
    fetchBalanceDetails: fetchBalanceDetails,
    stakingDetails: stakingDetails,
    claimInstaRewards: claimInstaRewards,
});

export default rootReducer;
