import React from "react";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AlertMessageProps = {
  msg: string;
  value: boolean;
  setValue: (x: boolean) => void;
  error: boolean;
  autoHideDuration?: number;
};

const AlertMessage: React.FC<AlertMessageProps> = ({
  msg = "",
  value,
  setValue,
  error,
  autoHideDuration = 3000,
}) => {
  const handleClose = () => {
    setValue(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={value}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        sx={{ width: "100%", wordBreak: "break-all" }}
        onClose={handleClose}
        severity={error ? "error" : "success"}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
