import { phoneRegex } from "../../utils/regex";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Phone Number is not valid"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
  address: Yup.string().required("Address is required"),
});

export default signupSchema;
