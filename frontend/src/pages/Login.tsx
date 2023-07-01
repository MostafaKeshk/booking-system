import { LoadingButton } from "@mui/lab";
import FormikInput from "../components/form/FormikInput";
import AlertMessage from "../components/general/AlertMessage";
import useLoginContainer from "../containers/useLoginContainer";
import { useAlert } from "../contexts/AlertContext";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FormikPassword from "../components/form/FormikPassword";
import LoginSvg from "../assets/svg/Login";
import { userTypes } from "../utils/constants";

const Login = () => {
  const { value, msg, setValue, error } = useAlert();

  const { formik, loading, handleNavigateSignUp, handleFill, filledValue } =
    useLoginContainer();
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
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                Welcome to Booking
              </Typography>
            </Box>
            <FormikInput
              formik={formik}
              name="email"
              label="Email"
              sx={{ my: 1 }}
            />

            <FormikPassword
              formik={formik}
              name="password"
              label="Password"
              sx={{ my: 1 }}
            />

            <Box>
              <LoadingButton
                variant="contained"
                onClick={formik.handleSubmit}
                loading={loading}
                fullWidth
                sx={{ mt: 1 }}
              >
                Login
              </LoadingButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mt: 1 }}>Or</Typography>
                <Button onClick={handleNavigateSignUp}>Sign Up</Button>

                <FormControl sx={{ mt: 2, minWidth: 180 }}>
                  <InputLabel>Fill Account (testing only)</InputLabel>
                  <Select
                    label="Fill Account (testing only)"
                    onChange={handleFill}
                    value={filledValue}
                  >
                    <MenuItem value={userTypes.user}>User</MenuItem>
                    <MenuItem value={userTypes.restaurant}>Restaurant</MenuItem>
                    <MenuItem value={userTypes.admin}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center",
            display: { xs: "none", lg: "flex" },
          }}
        >
          <LoginSvg />
        </Grid>
      </Grid>

      <AlertMessage value={value} setValue={setValue} error={error} msg={msg} />
    </Container>
  );
};

export default Login;
