import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { useFormik } from "formik";
import RestaurantApi from "../../../apis/restaurant";
import paths from "../../../routes/paths";
import { useAlert } from "../../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import restaurantSchema from "../../../validations/restaurant";
import { objectToFormData } from "../../../utils/objectToFormdata";

const useRestaurantContainer = (adminId: any, restaurantId?: any) => {
  const [pageLoading, setPageLoading] = useState(false);
  const { callApi, loading } = useCallApi();
  const { setSuccessMessage } = useAlert();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState("");

  useEffect(() => {
    if (restaurantId) {
      setPageLoading(true);

      callApi(
        RestaurantApi.getOne(restaurantId),
        (response: any) => {
          setInitialValues({
            name: response.name,
            phoneNumber: response.phoneNumber,
            email: response.email,
            address: response.address,
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
  }, [restaurantId]);

  const handleAdd = (values: any) => {
    const formdata = objectToFormData(values);

    callApi(RestaurantApi.create(formdata), () => {
      setSuccessMessage("Restaurant has been added successfully.");
      navigate(paths.getAdminRestaurants(adminId));
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

    callApi(RestaurantApi.update(restaurantId, formdata), () => {
      setSuccessMessage("Restaurant has been updated successfully.");
      navigate(paths.getAdminRestaurants(adminId));
    });
  };

  const handleSubmit = (values: any) =>
    restaurantId ? handleEdit(values) : handleAdd(values);

  const formik: any = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: () => restaurantSchema(restaurantId),
    onSubmit: (values: any) => handleSubmit(values),
  });

  return { formik, loading, pageLoading, image, setImage };
};

export default useRestaurantContainer;
