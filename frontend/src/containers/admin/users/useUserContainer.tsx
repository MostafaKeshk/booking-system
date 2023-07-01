import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { useFormik } from "formik";
import paths from "../../../routes/paths";
import { useAlert } from "../../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import userSchema from "../../../validations/user";
import { objectToFormData } from "../../../utils/objectToFormdata";
import UserApi from "../../../apis/user";

const useUserContainer = (adminId: any, userId?: any) => {
  const [pageLoading, setPageLoading] = useState(false);
  const { callApi, loading } = useCallApi();
  const { setSuccessMessage } = useAlert();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState("");

  useEffect(() => {
    if (userId) {
      setPageLoading(true);

      callApi(
        UserApi.getOne(userId),
        (response: any) => {
          setInitialValues({
            name: response.name,
            phoneNumber: response.phoneNumber,
            email: response.email,
            image: "",
            password: "",
            confirmPassword: "",
          });
          setImage(response.image);
          setPageLoading(false);
        },
        () => {
          setPageLoading(false);
        }
      );
    }
  }, [userId]);

  const handleAdd = (values: any) => {
    const formdata = objectToFormData(values);

    callApi(UserApi.create(formdata), () => {
      setSuccessMessage("User has been added successfully.");
      navigate(paths.getAdminUsers(adminId));
    });
  };

  const handleEdit = (values: any) => {
    const body = { ...values };

    if (values.image) {
      body.image = values.image;
    }

    if (values.password) {
      body.password = values.password;
    }

    const formdata = objectToFormData(values);

    callApi(UserApi.update(userId, formdata), () => {
      setSuccessMessage("User has been updated successfully.");
      navigate(paths.getAdminUsers(adminId));
    });
  };

  const handleSubmit = (values: any) =>
    userId ? handleEdit(values) : handleAdd(values);

  const formik: any = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: () => userSchema(userId),
    onSubmit: (values: any) => handleSubmit(values),
  });

  return { formik, loading, pageLoading, image, setImage };
};

export default useUserContainer;
