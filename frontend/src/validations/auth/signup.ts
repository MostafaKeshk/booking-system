import { userTypes } from "../../utils/constants";
import { phoneRegex } from "../../utils/regex";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Phone Number is not valid"),
  image: Yup.string().required("Image is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  userType: Yup.string()
    .oneOf([userTypes.user, userTypes.restaurant], "Invalid User Type")
    .required("User Type is required"),

  address: Yup.string().when("userType", {
    is: userTypes.restaurant,
    then: (schema) => schema.required("Address is required"),
  }),
});

export default signupSchema;
