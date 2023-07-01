import { LoadingButton } from "@mui/lab";
import FormikInput from "../components/form/FormikInput";
import AlertMessage from "../components/general/AlertMessage";
import useSignupContainer from "../containers/useSignupContainer";
import { useAlert } from "../contexts/AlertContext";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import FormikPassword from "../components/form/FormikPassword";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FormikSelect from "../components/form/FormikSelect";
import LoginSvg from "../assets/svg/Login";
import UploadImage from "../components/form/UploadImage";
import { userTypes } from "../utils/constants";

const Signup = () => {
  const { value, msg, setValue, error } = useAlert();
  const { formik, loading, handleNavigateLogin, image, setImage } =
    useSignupContainer();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <LocalMallIcon sx={{ color: "primary.main", fontSize: 60 }} />

                <Typography
                  color="primary"
                  align="center"
                  component="h1"
                  variant="h4"
                  sx={{ mt: 1, fontWeight: "bold" }}
                >
                  Booking App
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <UploadImage
                image={image}
                setImage={setImage}
                name="image"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormikInput formik={formik} name="name" label="Name" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormikInput formik={formik} name="email" label="Email" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormikInput
                formik={formik}
                name="phoneNumber"
                label="Phone Number"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormikSelect formik={formik} name="userType" label="User Type">
                <MenuItem value={userTypes.user}>User</MenuItem>
                <MenuItem value={userTypes.restaurant}>Restaurant</MenuItem>
              </FormikSelect>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormikPassword
                formik={formik}
                name="password"
                label="Password"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormikPassword
                formik={formik}
                name="confirmPassword"
                label="Confirm Password"
              />
            </Grid>

            {formik.values.userType === userTypes.restaurant && (
              <>
                <Grid item xs={12} lg={6}>
                  <FormikInput formik={formik} name="address" label="Address" />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                onClick={formik.handleSubmit}
                loading={loading}
                fullWidth
              >
                Sign up
              </LoadingButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mt: 1 }}>Or</Typography>
                <Button onClick={handleNavigateLogin}>Log in</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: { xs: "none", lg: "flex" },
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <LoginSvg />
        </Grid>
      </Grid>

      <AlertMessage value={value} setValue={setValue} error={error} msg={msg} />
    </Container>
  );
};

export default Signup;
