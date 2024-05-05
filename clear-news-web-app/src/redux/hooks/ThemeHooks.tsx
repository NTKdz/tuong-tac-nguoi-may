import { useDispatch } from "react-redux";
import {
  setBackGroundColor,
  setCurrent,
  setDefaultBackGroundColor,
  setFontFamily,
  setFontSize,
  setLineHeight,
  setMode,
  setPaperBackGroundColor,
  setPrimary,
  setSecondary,
  setTextColor,
  setTheme,
} from "../slices/themeSlices";

export interface ThemeState {
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
  lineHeight: string;
}
export const ThemeHooks = () => {
  const dispatch = useDispatch();
  // const { theme } = useSelector((state: RootState) => state);

  function changeCurrent(current: string) {
    dispatch(setCurrent(current));
  }
  function changeMode(mode: string) {
    dispatch(setMode(mode));
  }
  function changeTheme(theme: ThemeState) {
    dispatch(setTheme(theme));
    dispatch(setLineHeight(theme.lineHeight));
  }
  function changePrimary(main: string, contrastText: string) {
    dispatch(setPrimary({ main: main, contrastText: contrastText }));
  }
  function changeSecondary(main: string, contrastText: string) {
    dispatch(setSecondary({ main: main, contrastText: contrastText }));
  }
  function changeFontSize(fontSize: number) {
    dispatch(setFontSize(fontSize));
  }
  function changeFontFamily(family: string) {
    dispatch(setFontFamily(family));
  }
  function changeLineHeight(height: string) {
    dispatch(setLineHeight(height));
  }
  function changeBackgroundColor(color: string) {
    dispatch(setBackGroundColor({ default: color, paper: color }));
  }
  function changeDefaultBackgroundColor(color: string) {
    dispatch(setDefaultBackGroundColor(color));
  }
  function changePaperBackgroundColor(color: string) {
    dispatch(setPaperBackGroundColor(color));
  }
  function changeTextColor(color: string) {
    dispatch(setTextColor({ primary: color, secondary: "" }));
  }
  return {
    changeCurrent,
    changeMode,
    changeTheme,
    changePrimary,
    changeSecondary,
    changeBackgroundColor,
    changeFontSize,
    changeTextColor,
    changeDefaultBackgroundColor,
    changePaperBackgroundColor,
    changeFontFamily,
    changeLineHeight,
  };
};
