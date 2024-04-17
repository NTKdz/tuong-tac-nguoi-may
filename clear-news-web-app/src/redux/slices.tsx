import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultStyles } from "../theme";

const themeSlice = createSlice({
  name: "theme",
  initialState: defaultStyles,
  reducers: {
    setTheme: (state, action) => {
      state = action.payload;
    },
    setPrimary: (
      state,
      action: PayloadAction<{ main: string; contrastText: string }>
    ) => {
      state.theme.primary = action.payload;
    },
    setSecondary: (
      state,
      action: PayloadAction<{ main: string; contrastText: string }>
    ) => {
      state.theme.secondary = action.payload;
    },
    setFontSize: (state, action: PayloadAction<{ fontSize: number }>) => {
      state.theme.typography = action.payload;
    },
    setBackGroundColor: (
      state,
      action: PayloadAction<{ default: string; paper: string }>
    ) => {
      state.theme.background = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTheme,
  setPrimary,
  setSecondary,
  setFontSize,
  setBackGroundColor,
} = themeSlice.actions;

export default themeSlice.reducer;
