import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "The note is too long"),
  tag: Yup.string().required("This field is required"),
});
