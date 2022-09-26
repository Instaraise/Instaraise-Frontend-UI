import { fetchAllTrendingNews } from "./api.news";
import { FETCH_ALL_TRENDING_NEWS_ACTION } from "./index.action";

export const FETCH_ALL_TRENDING_NEWS = () => {
  return async (dispatch) => {
    const API_RESP = await fetchAllTrendingNews();
    if (API_RESP.status) {
      return dispatch({
        type: FETCH_ALL_TRENDING_NEWS_ACTION,
        payload: API_RESP.data,
      });
    } else {
      return dispatch({
        type: FETCH_ALL_TRENDING_NEWS_ACTION,
        payload: [],
      });
    }
  };
};
