import * as yup from "yup";
export const eventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  date: yup.string().required("Date is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  image: yup.string().required("Image is required"),
  author: yup.string().required("Author is required"),
});

export const newsSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  date: yup.string().required("Date is required"),
});
