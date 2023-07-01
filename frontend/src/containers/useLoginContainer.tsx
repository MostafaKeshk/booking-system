import LoginApi from "../apis/auth";
import { useAuth } from "../contexts/AuthContext";
import { useFormik } from "formik";
import useCallApi from "../hooks/useCallApi";
import loginSchema from "../validations/auth/login";
import paths from "../routes/paths";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userTypes } from "../utils/constants";
import { testingAccounts } from "../utils/testingAccounts";

const useLoginContainer = () => {
  const { callApi, loading } = useCallApi();
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [filledValue, setFilledValue] = useState("");
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (values: any) => {
    callApi(LoginApi.login(values), (response: any) => {
      handleLogin(response.user, response.token);
    });
  };

  const formik: any = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values: any) => handleSubmit(values),
  });

  const handleNavigateSignUp = () => {
    navigate(paths.signup);
  };

  const handleFill = (e: any) => {
    const v = e.target.value;
    setFilledValue(v);
    if (v === userTypes.user) {
      setInitialValues(testingAccounts.userAccount);
      return;
    }

    if (v === userTypes.restaurant) {
      setInitialValues(testingAccounts.restaurantAccount);
      return;
    }

    if (v === userTypes.admin) {
      setInitialValues(testingAccounts.adminAccount);
      return;
    }
  };

  return { formik, loading, handleNavigateSignUp, handleFill, filledValue };
};

export default useLoginContainer;
