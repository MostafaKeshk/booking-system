import { useAuth } from "../contexts/AuthContext";
import { useFormik } from "formik";
import useCallApi from "../hooks/useCallApi";
import signupSchema from "../validations/auth/signup";
import AuthApi from "../apis/auth";
import paths from "../routes/paths";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { objectToFormData } from "../utils/objectToFormdata";
import { userTypes } from "../utils/constants";

const useSignupContainer = () => {
  const { callApi, loading } = useCallApi();
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const handleSubmit = (values: any) => {
    const body: any = {
      name: values.name,
      email: values.email,
      image: values.image,
      phoneNumber: values.phoneNumber,
      password: values.password,
      userType: values.userType,
    };

    if (values.userType === userTypes.restaurant) {
      body.address = values.address;
    }

    const formdata = objectToFormData(body);

    if (values.userType === userTypes.restaurant) {
      callApi(AuthApi.restaurantSignup(formdata), (response: any) => {
        handleLogin(response.user, response.token);
      });
    } else if (values.userType === userTypes.user) {
      callApi(AuthApi.userSignup(formdata), (response: any) => {
        handleLogin(response.user, response.token);
      });
    }
  };

  const formik: any = useFormik({
    initialValues: {
      name: "",
      image: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      userType: "",
      address: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values: any) => handleSubmit(values),
  });

  const handleNavigateLogin = () => {
    navigate(paths.login);
  };

  return {
    formik,
    loading,
    handleNavigateLogin,
    image,
    setImage,
  };
};

export default useSignupContainer;
