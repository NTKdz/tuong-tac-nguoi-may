import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "theme",
  initialState: { loading: false },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
