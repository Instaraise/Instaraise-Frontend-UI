import { combineReducers } from 'redux';

import { getTokenData, selectNetwork } from './dex/dex.reducer';
import {
    convert_pay_values_pools,
    getPoolData,
    handle_pay_values_pools,
    setLiquidityPoolPair,
} from './dex/liquidity.reducer';
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
});

export default rootReducer;
