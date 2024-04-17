import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { RootState, store, useAppSelector } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode, responsiveFontSizes } from "@mui/material";
import { useEffect } from "react";
import { defaultStyles } from "./theme";

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
      // primary: {
      //   main: theme.primary.main,
      //   contrastText: theme.primary.contrastText,
      // },
      // secondary: {
      //   main: theme.secondary.main,
      //   contrastText: theme.secondary.contrastText,
      // },
      background: {
        default: theme.background.default,
        paper: theme.background.paper,
      },
      text: {
        // primary:
        //   theme.text.primary !== ""
        //     ? theme.text.primary
        //     : theme.primary.contrastText,
        // secondary:
        //   theme.text.secondary !== ""
        //     ? theme.text.secondary
        //     : theme.secondary.contrastText,
      },
      // getContrastText: (background) => {
      //   return "#111111";
      // },
    },
    typography: {
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
      button: {
      },
    },
    components: {
      MuiButton: {
        // styleOverrides: {},
      },
      // MuiTextField: {
      //   styleOverrides: {
      //     root: {
      //       "& .MuiOutlinedInput-root": {
      //         borderRadius: "8px",
      //         color: theme.primary.contrastText,
      //         "& .MuiOutlinedInput-notchedOutline": {
      //           borderColor: theme.primary.contrastText,
      //         },
      //         "&.Mui-focused": {
      //           "& .MuiOutlinedInput-notchedOutline": {
      //             borderColor: theme.primary.contrastText,
      //             borderWidth: "2px",
      //           },
      //         },
      //         "&:hover:not(.Mui-focused)": {
      //           "& .MuiOutlinedInput-notchedOutline": {
      //             borderColor: theme.primary.contrastText,
      //             borderWidth: "3px",
      //           },
      //         },
      //       },
      //       "& .MuiInputLabel-outlined": {
      //         color: theme.primary.contrastText,
      //         "&.Mui-focused": {
      //           color: theme.primary.contrastText,
      //           fontWeight: "bold",
      //         },
      //       },

      //       "& .MuiInput-root": {
      //         color: theme.primary.contrastText,
      //         fontFamily: "Arial",
      //         // fontWeight: "bold",
      //         "&:before": {
      //           borderColor: theme.primary.contrastText,
      //           borderWidth: "2px",
      //         },
      //         "&:after": {
      //           borderColor: theme.primary.contrastText,
      //           borderWidth: "3px",
      //         },
      //         ":hover:not(.Mui-focused)": {
      //           "&:before": {
      //             borderColor: theme.primary.contrastText,
      //             borderWidth: "2px",
      //           },
      //         },
      //       },
      //       "& .MuiInputLabel-standard": {
      //         color: theme.primary.contrastText,
      //         // fontWeight: "bold",
      //         "&.Mui-focused": {
      //           fontWeight: "bold",
      //           color: theme.primary.contrastText,
      //         },
      //       },
      //     },
      //   },
      // },
    },
  });

function App() {
  const { theme } = useSelector((state: RootState) => state);
  useEffect(() => {
    console.log(theme);
  }, []);
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
