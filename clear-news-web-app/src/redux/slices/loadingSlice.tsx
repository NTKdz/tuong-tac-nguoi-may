import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "theme",
  initialState: { loading: false, audioLink: "", isLogin: false },
  reducers: {
    setLoading: (
      state: { loading: boolean; audioLink: string },
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
    setAudioLink: (
      state: { loading: boolean; audioLink: string },
      action: PayloadAction<string>
    ) => {
      state.audioLink = action.payload;
    },
    setLogin: (state: { isLogin: boolean }, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setAudioLink, setLogin } = loadingSlice.actions;

export default loadingSlice.reducer;
