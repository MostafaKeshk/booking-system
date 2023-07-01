import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./contexts/AlertContext";
import { UserProvider } from "./contexts/AuthContext";

import Navigation from "./routes/Navigation";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <UserProvider>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </UserProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}
