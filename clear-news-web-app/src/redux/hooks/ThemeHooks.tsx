import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../store";
import {
  setBackGroundColor,
  setFontSize,
  setPrimary,
  setSecondary,
  setTheme,
} from "../slices";

interface themeState {
  mode: string;
  style: {
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
    typography: { fontsize: number };
  };
}
export const ThemeHooks = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state);

  function changeTheme(theme: themeState) {
    dispatch(setTheme(theme));
  }
  function changePrimary(main: string, contrastText: string) {
    dispatch(setPrimary({ main: main, contrastText: contrastText }));
  }
  function changeSecondary(main: string, contrastText: string) {
    dispatch(setSecondary({ main: main, contrastText: contrastText }));
  }
  function changeFontSize(fontSize: number) {
    console.log(fontSize);
    dispatch(setFontSize({ fontSize: fontSize }));
  }
  function changeBackgroundColor(color: string) {
    dispatch(setBackGroundColor({ default: color, paper: color }));
  }
  return {
    changeTheme,
    changePrimary,
    changeSecondary,
    changeBackgroundColor,
    changeFontSize,
  };
};
