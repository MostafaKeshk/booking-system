import { useAuth } from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import useCallApi from "../../../hooks/useCallApi";
import settingsSchema from "../../../validations/restaurant/settings";
import AuthApi from "../../../apis/auth";
import { useEffect, useState } from "react";
import { objectToFormData } from "../../../utils/objectToFormdata";
import { useAlert } from "../../../contexts/AlertContext";
import RestaurantApi from "../../../apis/restaurant";

const useRestaurantSettingsContainer = () => {
  const { callApi, loading } = useCallApi();
  const { user, setUser } = useAuth();
  const { setSuccessMessage } = useAlert();
  const [initialValues, setInitialValues] = useState({
    name: "",
    image: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    setInitialValues({
      name: user.name,
      image: "",
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      password: "",
      confirmPassword: "",
    });
    setImage(user.image);
  }, []);

  const handleSubmit = (values: any) => {
    const body: any = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
    };

    if (values.image) {
      body.image = values.image;
    }

    if (values.password) {
      body.password = values.password;
    }

    const formdata = objectToFormData(body);

    callApi(RestaurantApi.update(user._id, formdata), (response: any) => {
      setSuccessMessage("your data has been updated successfully.");
      const newUser = {
        ...user,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };

      if (values.image) {
        newUser.image = response.restaurant.image;
      }

      setUser(newUser);
      localStorage.setItem("booking-user", JSON.stringify(newUser));
    });
  };

  const formik: any = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: settingsSchema,
    onSubmit: (values: any) => handleSubmit(values),
  });

  return {
    formik,
    loading,
    image,
    setImage,
  };
};

export default useRestaurantSettingsContainer;
