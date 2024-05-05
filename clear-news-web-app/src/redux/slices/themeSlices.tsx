import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultStyles } from "../../theme";

const themeSlice = createSlice({
  name: "theme",
  initialState: () => {
    return localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme")!)
      : defaultStyles;
  },
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
      const readStyle = state.current === "reading" ? "read-theme" : "theme";
      if (localStorage.getItem(readStyle)) {
        state.theme = JSON.parse(localStorage.getItem(readStyle)!).theme;
      }
    },
    setTheme: (
      state,
      action: PayloadAction<{
        mode: string;
        theme: {
          primary: {
            main: string;
            contrastText: string;
          };
          secondary: {
            main: string;
            contrastText: string;
          };
          background: {
            default: string;
            paper: string;
          };
          text: {
            primary: string;
            secondary: string;
          };
          typography: { fontSize: number; fontFamily: string };
        };
      }>
    ) => {
      state.theme = action.payload.theme;
      state.mode = action.payload.mode;
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
    setTextColor: (
      state,
      action: PayloadAction<{ primary: string; secondary: string }>
    ) => {
      state.theme.text = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.theme.typography.fontSize = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.theme.typography.fontFamily = action.payload;
    },
    setLineHeight: (state, action: PayloadAction<string>) => {
      state.lineHeight = action.payload;
    },
    setBackGroundColor: (
      state,
      action: PayloadAction<{ default: string; paper: string }>
    ) => {
      state.theme.background = action.payload;
    },
    setDefaultBackGroundColor: (state, action: PayloadAction<string>) => {
      state.theme.background.default = action.payload;
    },
    setPaperBackGroundColor: (state, action: PayloadAction<string>) => {
      console.log("dfa");
      state.theme.background.paper = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMode,
  setTheme,
  setPrimary,
  setSecondary,
  setFontSize,
  setBackGroundColor,
  setTextColor,
  setDefaultBackGroundColor,
  setPaperBackGroundColor,
  setFontFamily,
  setLineHeight,
  setCurrent,
} = themeSlice.actions;

export default themeSlice.reducer;
