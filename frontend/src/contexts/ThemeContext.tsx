import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import React, { createContext, useContext } from "react";
import { darkTheme, lightTheme } from "../theme";
import GlobalStyles from "../theme/GlobalStyles";

type ThemeContextType = {
  darkMode: boolean;
  handleThemeChange: any;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const isDarkMode = JSON.parse(localStorage.getItem("e-darkmode") as any);
    return !!isDarkMode;
  });

  const theme = darkMode ? darkTheme : lightTheme;

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("booking-darkmode", JSON.stringify(!darkMode));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, handleThemeChange }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />

        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
