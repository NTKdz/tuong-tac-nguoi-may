import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Button,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
} from "@mui/material";

const styles = {
  mode: "light" as PaletteMode,
  light: {
    primary: {
      main: "#ffffff",
      contrastText: "#3c3c3c",
    },
    secondary: {
      main: "#f0f4f9",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f0f4f9",
      paper: "#ffffff",
    },
    text: {
      primary: "",
      secondary: "",
    },
  },
};
const theme = (
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
  },
  mode: PaletteMode | undefined
) =>
  createTheme({
    palette: {
      primary: {
        main: theme.primary.main,
        contrastText: theme.primary.contrastText,
      },
      secondary: {
        main: theme.secondary.main,
        contrastText: theme.secondary.contrastText,
      },
      mode: mode,
      background: {
        default: theme.background.default,
        paper: theme.background.paper,
      },
      text: {
        primary:
          theme.text.primary !== ""
            ? theme.text.primary
            : theme.primary.contrastText,
        secondary:
          theme.text.secondary !== ""
            ? theme.text.secondary
            : theme.secondary.contrastText,
      },
      // getContrastText: (background) => {
      //   return "#111111";
      // },
    },
    typography: { button: { fontSize: 14 }, fontSize: 14 },
    components: {
      MuiButton: {
        // styleOverrides: {},
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            MuiPaper: {
              root: {
                // padding: "10px",
                // marginBottom: "10px",
              },
            },
            "& .MuiOutlinedInput-root": {
              color: theme.primary.contrastText,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.primary.contrastText,
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.primary.contrastText,
                  borderWidth: "2px",
                },
              },
              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.primary.contrastText,
                  borderWidth: "3px",
                },
              },
            },
            "& .MuiInputLabel-outlined": {
              color: theme.primary.contrastText,
              "&.Mui-focused": {
                color: theme.primary.contrastText,
                fontWeight: "bold",
              },
            },
          },
        },
      },
    },
  });

function App() {
  return (
    <ThemeProvider
      theme={responsiveFontSizes(theme(styles.light, styles.mode))}
    >
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
