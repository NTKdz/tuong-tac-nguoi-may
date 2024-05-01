import { CssBaseline, PaletteMode, responsiveFontSizes } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { RootState, store } from "./redux/store";
import { router } from "./routes";

const myTheme = (
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
    typography: { fontSize: number };
  },
  mode: PaletteMode | undefined
) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: theme.primary.main,
        contrastText: theme.primary.contrastText,
      },
      secondary: {
        main: theme.secondary.main,
        contrastText: theme.secondary.contrastText,
      },
      background: {
        default: mode === "dark" ? "#121212" : theme.background.default,
        paper: mode === "dark" ? "#121212" : theme.background.paper,
      },
      text: {
        primary: mode === "dark" ? "#CCCCCC" : theme.text.primary,

        // secondary:
        //   theme.text.secondary !== ""
        //     ? theme.text.secondary
        //     : theme.secondary.contrastText,
      },
    },
    typography: {
      fontFamily: `sans-serif`,
      fontSize: theme.typography.fontSize,
      // body1: { fontSize: theme.typography.fontSize },
      // body2: {},
      // caption: {},
      // h1: {},
      // h2: {},
      // h3: {},
      // h4: {},
      // h5: {},
      // h6: {},
      button: {},
    },
    components: {
      MuiButton: {
        // styleOverrides: {},
      },
    },
  });

function App() {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <ThemeProvider
      theme={responsiveFontSizes(
        myTheme(theme.theme, theme.mode as PaletteMode)
      )}
    >
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
