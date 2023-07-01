import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type IProps = {
  formik: any;
  name: string;
} & TextFieldProps;

const FormikInput: React.FC<IProps> = ({ formik, name, ...props }) => {
  const formikProps = formik.getFieldProps(name);

  const error = formik.errors[name];
  const helperText = formik.touched[name] && error;

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={formikProps.value}
      error={helperText && Boolean(error)}
      helperText={helperText && error}
      {...formikProps}
      {...props}
    />
  );
};

export default FormikInput;
