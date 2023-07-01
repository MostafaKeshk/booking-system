import * as Yup from "yup";

const schema = Yup.object().shape({
  stars: Yup.number()
    .required("Stars is required")
    .min(1, "Stars must be greater than 0")
    .typeError("Stars must be greater than 0"),
  comment: Yup.string().required("Comment is required"),
});

export default schema;
