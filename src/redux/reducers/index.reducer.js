import { combineReducers } from 'redux';

import { fetchAllTrendingNews } from './news.reducer';
import { tokenInfo } from './stats.reducer';
const rootReducer = combineReducers({
    allTrendingNews: fetchAllTrendingNews,
    tokenInfo: tokenInfo,
});

export default rootReducer;
