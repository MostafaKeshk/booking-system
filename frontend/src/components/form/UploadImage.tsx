import { Box, FormHelperText, useTheme } from "@mui/material";
import { Colors } from "../../theme/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";

import { useAlert } from "../../contexts/AlertContext";

type IProps = {
  image: any;
  setImage: any;
  name: string;
  formik: any;
  disabled?: boolean;
  maxMb?: number;
  onChange?: any;
};

const UploadImage: React.FC<IProps> = ({
  image,
  setImage,
  name,
  formik,
  disabled = false,
  maxMb = 5,
  onChange,
}) => {
  const theme = useTheme();
  const error = formik.errors[name];
  const helperText = formik.touched[name] && error;

  const classes = {
    flex: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      position: "relative",
      height: "105px",
      width: "105px",
      borderRadius: "100px",
      cursor: disabled ? "cursor" : "pointer",
      backgroundColor: helperText ? Colors.dangerWhite : "common.white",
      border: `7.5px solid ${theme.palette.primary.main}`,
    },
    editIcon: {
      position: "absolute",
      zIndex: 1130,
      bottom: -10,
      right: -10,
      backgroundColor: "common.white",
      borderRadius: "50%",
      display: "flex",
      p: 0.5,
      opacity: 1,
    },
  };

  const { setErrorMessage } = useAlert();

  const handleFile = (event: any) => {
    const file = event.target.files[0];
    const maxAllowedSize = maxMb * 1024 * 1024;
    if (file.size > maxAllowedSize) {
      setErrorMessage(`Image can not extend ${maxMb} mb`);
      return;
    }

    formik.setFieldValue(name, file);
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => setImage([reader.result]);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box sx={classes.flex}>
      <Box sx={classes.center} component="label">
        {handleFile && !disabled && (
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/heif"
            hidden
            key={image}
            onChange={(e: any) => handleFile(e)}
            disabled={disabled}
          />
        )}
        {image ? (
          <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "100px",
                height: "100%",
              }}
            >
              <img
                src={image}
                alt="uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {!disabled && (
              <Box sx={classes.editIcon}>
                <EditIcon sx={{ color: "common.black" }} />
              </Box>
            )}
          </Box>
        ) : (
          <FileUploadIcon sx={{ fontSize: "40px", color: "common.black" }} />
        )}
      </Box>

      <FormHelperText error sx={{ textAlign: "center" }}>
        {helperText}
      </FormHelperText>
    </Box>
  );
};

export default UploadImage;
