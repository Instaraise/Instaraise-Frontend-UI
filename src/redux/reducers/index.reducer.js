import { combineReducers } from "redux";
import { fetchAllTrendingNews } from "./news.reducer";
const rootReducer = combineReducers({
  allTrendingNews: fetchAllTrendingNews,
});

export default rootReducer;
