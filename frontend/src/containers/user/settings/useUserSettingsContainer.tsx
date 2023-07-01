import { useAuth } from "../../../contexts/AuthContext";
import { useFormik } from "formik";
import useCallApi from "../../../hooks/useCallApi";
import settingsSchema from "../../../validations/user/settings";
import { useEffect, useState } from "react";
import { objectToFormData } from "../../../utils/objectToFormdata";
import { useAlert } from "../../../contexts/AlertContext";
import UserApi from "../../../apis/user";

const useUserSettingsContainer = () => {
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
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    setInitialValues({
      name: user.name,
      image: "",
      email: user.email,
      phoneNumber: user.phoneNumber,
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
    };

    if (values.image) {
      body.image = values.image;
    }

    if (values.password) {
      body.password = values.password;
    }

    const formdata = objectToFormData(body);

    callApi(UserApi.update(user._id, formdata), (response: any) => {
      setSuccessMessage("your data has been updated successfully.");
      const newUser = {
        ...user,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };

      if (values.image) {
        newUser.image = response.user.image;
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

export default useUserSettingsContainer;
