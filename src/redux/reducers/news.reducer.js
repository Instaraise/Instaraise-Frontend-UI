import { FETCH_ALL_TRENDING_NEWS_ACTION } from "../actions/index.action";

export const fetchAllTrendingNews = (intialState = [], action) => {
  switch (action.type) {
    case FETCH_ALL_TRENDING_NEWS_ACTION:
      return action.payload;
    default:
      return intialState;
  }
};
