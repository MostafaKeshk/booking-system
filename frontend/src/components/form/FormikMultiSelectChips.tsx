import {
  MenuItem,
  Chip,
  FormControl,
  Checkbox,
  FormHelperText,
  Select,
  Box,
  InputLabel,
} from "@mui/material";

type IProps = {
  name: string;
  label: string;
  formik: any;
  menu: any[];
  handleChange?: any;
};

const FormikMultiSelectChips: React.FC<IProps> = ({
  name,
  label,
  formik,
  menu,
  handleChange,
}) => {
  const formikProps = formik.getFieldProps(name);

  const error = formik.errors[name];
  const helperText = formik.touched[name] && error;

  return (
    <FormControl fullWidth>
      {label && (
        <InputLabel error={helperText && Boolean(error)}>{label}</InputLabel>
      )}

      <Select
        error={helperText && Boolean(error)}
        multiple
        fullWidth
        label={label}
        value={formikProps.value}
        onChange={(e: any) => {
          if (handleChange) {
            handleChange(e.target.value);
          }
          formik.setFieldValue(name, e.target.value);
        }}
        renderValue={(selected: any) => {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value: any) => {
                const item = menu?.find((e: any) => e.value === value);
                return (
                  <Chip
                    key={value}
                    sx={{ mr: 1, my: 0.5 }}
                    label={item.label}
                  />
                );
              })}
            </Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
      >
        {menu.map((item: any) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={formik.values[name].indexOf(item.value) > -1} />
            <Chip sx={{ mr: 1, my: 0.5 }} label={item.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && Boolean(error) && (
        <FormHelperText error>{helperText && error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikMultiSelectChips;
