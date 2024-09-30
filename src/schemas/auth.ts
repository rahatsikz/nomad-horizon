import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).max(20).required("Password is required"),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).max(20).required("Password is required"),
});
