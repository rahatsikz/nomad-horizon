import * as yup from "yup";
export const feedbackSchema = yup.object().shape({
  content: yup.string().required("Please enter your feedback"),
});
