import { useState, useEffect, createContext, useContext } from "react";
import Loading from "../components/general/Loading";
import paths from "../routes/paths";
import { useNavigate } from "react-router-dom";

type ContextState = {
  user: any | null;
  setUser: (user: any) => void;
  token: any | null;
  setToken: (token: any) => void;
  handleLogin: (user: any, token: any) => void;
  handleLogout: () => void;
};

const initialValues = {
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
};

type IProps = {
  children: React.ReactElement<any, any> & React.ReactNode;
};

export const AuthContext = createContext<ContextState>(initialValues);

export const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<any | null>(null);
  const navigate = useNavigate();
  const handleLogin = (user: any, token: any) => {
    localStorage.setItem("booking-user", JSON.stringify(user));
    localStorage.setItem("booking-token", JSON.stringify(token));
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("booking-user");
    localStorage.removeItem("booking-token");
    setUser(null);
    setToken(null);
    navigate(paths.login);
  };

  // Effect to load user and token from local storage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("booking-user") as any);
    const tokenData = JSON.parse(localStorage.getItem("booking-token") as any);

    // If the user and token aren't already set and we have values in local storage, then use those
    if ((!user || !token) && userData && tokenData) {
      setUser(userData);
      setToken(tokenData);
    }

    setLoading(false);

    // eslint-disable-next-line
  }, [user, token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        handleLogin,
        handleLogout,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): ContextState => useContext(AuthContext);
