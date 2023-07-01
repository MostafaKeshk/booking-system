import { createTheme } from "@mui/material/styles";
import { Colors } from "./colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: Colors.primaryLight,
    },
    secondary: {
      main: Colors.secondaryLight,
    },
    background: {
      default: Colors.backgroundLight,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${Colors.backgroundLight} inset!important`,
            WebkitTextFillColor: Colors.primaryLight,
            caretColor: Colors.primaryLight,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "&::-webkit-scrollbar": {
          width: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: Colors.primaryLight,
          width: "10px",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: Colors.primaryDark,
    },
    secondary: {
      main: Colors.secondaryDark,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${Colors.backgroundDark} inset!important`,
            WebkitTextFillColor: Colors.primaryDark,
            caretColor: Colors.primaryDark,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "&::-webkit-scrollbar": {
          width: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: Colors.primaryDark,
          width: "10px",
        },
      },
    },
  },
});
