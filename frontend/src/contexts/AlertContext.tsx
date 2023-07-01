import React, { useContext, useState } from "react";

type ContextState = {
  msg: string;
  value: boolean;
  setValue: (x: boolean) => void | null;
  setErrorMessage: (message: string) => void | null;
  setSuccessMessage: (x: string) => void | null;
  error: boolean;
};

type IProps = {
  children: React.ReactElement<any, any> & React.ReactNode;
};

export const AlertContext = React.createContext<ContextState>({
  msg: "",
  value: false,
  setValue: () => {},
  setErrorMessage: () => {},
  setSuccessMessage: () => {},
  error: false,
});

export const AlertProvider: React.FC<IProps> = ({ children }) => {
  const [value, setValue] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const setErrorMessage = (message: string) => {
    setMsg(message);
    setError(true);
    setValue(true);
  };

  const setSuccessMessage = (x: string) => {
    setMsg(x);
    setError(false);
    setValue(true);
  };

  const contextValue = {
    msg,
    setErrorMessage,
    setSuccessMessage,
    error,
    value,
    setValue,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
