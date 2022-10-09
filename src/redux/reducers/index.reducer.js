import { combineReducers } from 'redux';

import { priceGraph, selectedGraphType, selectedNoDays } from './graph.reducer';
import { fetchAllTrendingNews } from './news.reducer';
import { tokenInfo } from './stats.reducer';
const rootReducer = combineReducers({
    allTrendingNews: fetchAllTrendingNews,
    tokenInfo: tokenInfo,
    priceGraph: priceGraph,
    selectedNoDays: selectedNoDays,
    selectedGraphType: selectedGraphType,
});

export default rootReducer;
