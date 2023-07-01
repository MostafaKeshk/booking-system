import { phoneRegex } from "../../utils/regex";
import * as Yup from "yup";

const userSchema = (id?: any) =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegex, "Phone Number is not valid"),
    ...(id
      ? {}
      : {
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required"),
          image: Yup.mixed().required("Image is required"),
        }),
  });

export default userSchema;
