import { TextField, TextFieldProps } from "@mui/material";

type IProps = {
  formik: any;
  handleChange?: any;
  name: string;
} & TextFieldProps;

const FormikSelect: React.FC<IProps> = ({
  name,
  label,
  formik,
  handleChange,
  children,
}) => {
  const formikProps = formik.getFieldProps(name);

  const error = formik.errors[name];
  const helperText = formik.touched[name] && error;

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      name={name}
      select
      value={formikProps.value}
      error={helperText && Boolean(error)}
      helperText={helperText && error}
      onChange={(e: any) => {
        if (handleChange) {
          handleChange(e.target.value);
        }
        formik.setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </TextField>
  );
};

export default FormikSelect;
