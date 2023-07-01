import { LoadingButton } from "@mui/lab";
import FormikInput from "../../components/form/FormikInput";
import useRestaurantSettingsContainer from "../../containers/restaurant/settings/useRestaurantSettingsContainer";
import { Container, Grid } from "@mui/material";
import FormikPassword from "../../components/form/FormikPassword";

import UploadImage from "../../components/form/UploadImage";
import withRestaurant from "../../routes/withRestaurant";

const RestaurantSettings = () => {
  const { formik, loading, image, setImage } = useRestaurantSettingsContainer();

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", height: "80vh", alignItems: "center" }}
    >
      <Grid container spacing={2}>
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
          <FormikInput formik={formik} name="address" label="Address" />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FormikPassword formik={formik} name="password" label="Password" />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FormikPassword
            formik={formik}
            name="confirmPassword"
            label="Confirm Password"
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            onClick={formik.handleSubmit}
            loading={loading}
            fullWidth
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRestaurant(RestaurantSettings);
