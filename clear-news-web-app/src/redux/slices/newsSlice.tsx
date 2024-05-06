import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsDetail, NewsResult, NewsState } from "../interface/newsInterface";

const newsInitState: NewsState = {
  newsDetail: {} as NewsDetail,
  latestNews: {} as NewsResult,
  trendingNews: {} as NewsResult,
  newsByQuery: {} as NewsResult,
};
const newsSlice = createSlice({
  name: "theme",
  initialState: newsInitState,
  reducers: {
    setNewsDetail: (state, action: PayloadAction<NewsDetail>) => {
      state.newsDetail = action.payload;
    },
    setLatestNews: (state, action: PayloadAction<NewsResult>) => {
      state.latestNews = action.payload;
    },
    setTrendingNews: (state, action: PayloadAction<NewsResult>) => {
      state.trendingNews = action.payload;
    },
    setNewsByQuery: (state, action: PayloadAction<NewsResult>) => {
      state.newsByQuery = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewsDetail, setLatestNews, setTrendingNews, setNewsByQuery } =
  newsSlice.actions;

export default newsSlice.reducer;
