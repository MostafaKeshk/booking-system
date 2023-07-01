import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type IProps = {
  formik: any;
  name: string;
} & TextFieldProps;

const FormikPassword: React.FC<IProps> = ({ formik, name, ...props }) => {
  const formikProps = formik.getFieldProps(name);

  const error = formik.errors[name];
  const helperText = formik.touched[name] && error;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="togglePasswordVisibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff sx={{ opacity: 0.5, color: "primary.main" }} />
              ) : (
                <Visibility sx={{ opacity: 0.5, color: "primary.main" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={formikProps.value}
      error={helperText && Boolean(error)}
      helperText={helperText && error}
      {...formikProps}
      {...props}
    />
  );
};

export default FormikPassword;
