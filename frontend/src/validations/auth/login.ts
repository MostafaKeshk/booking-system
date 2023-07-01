import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export default schema;
