import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlices";
import newsSlice from "./slices/newsSlice";
import loadingSlice from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    news: newsSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
