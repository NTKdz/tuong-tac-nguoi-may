import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Outlined
          "& .MuiOutlinedInput-root": {
            color: "#000",
            fontFamily: "Arial",
            fontWeight: "bold",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2e2e2e",
              borderWidth: "2px",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
                borderWidth: "3px",
              },
            },
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "#2e2e2e",
            fontWeight: "bold",
            "&.Mui-focused": {
              color: "secondary.main",
            },
          },
          // Filled
          "& .MuiFilledInput-root": {
            color: "#000",
            fontFamily: "Arial",
            fontWeight: "bold",
            backgroundColor: "#e7e7e7",
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
            "&:before": {
              borderColor: "#2e2e2e",
              borderWidth: "2px",
            },
            "&:after": {
              borderColor: "secondary.main",
              borderWidth: "3px",
            },
            ":hover:not(.Mui-focused)": {
              "&:before": {
                borderColor: "#e7e7e7",
                borderWidth: "2px",
              },
              backgroundColor: "#f4f4f4",
            },
          },
          "& .MuiInputLabel-filled": {
            color: "#2e2e2e",
            fontWeight: "bold",
            "&.Mui-focused": {
              color: "secondary.main",
            },
          },
          // Standard
          "& .MuiInput-root": {
            color: "#000",
            fontFamily: "Arial",
            fontWeight: "bold",
            "&:before": {
              borderColor: "#2e2e2e",
              borderWidth: "2px",
            },
            "&:after": {
              borderColor: "secondary.main",
              borderWidth: "3px",
            },
            ":hover:not(.Mui-focused)": {
              "&:before": {
                borderColor: "#e7e7e7",
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },
  },
});

const hoverStyle = {
  ":hover": {
    scale: "1.1",
    backgroundColor: theme.palette.background.paper,
  },
};