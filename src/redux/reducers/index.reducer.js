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
    getPoolData,
    handle_pay_values_pools,
    setLiquidityPoolPair,
    setStakedToken,
    tokenBalance,
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
    stakedPair: setStakedToken,
    selectedToken: selectedTokenDex,
    handle_pay_values_market: handle_pay_values,
    tokenBalance: tokenBalance,
    convert_pay_values_market: convert_pay_values,
    convertTokens: convert_tokens,
    priceimpact: getPriceImpact,
});

export default rootReducer;
