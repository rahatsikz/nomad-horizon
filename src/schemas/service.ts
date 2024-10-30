import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  serviceName: yup.string().required("Service name is required"),
  content: yup.string().required("Content is required"),
  image: yup.mixed().required("image is required"),
  price: yup.number().required("Price is required"),
  status: yup.string().required("Status is required"),
  category: yup.string().required("Category is required"),
});
