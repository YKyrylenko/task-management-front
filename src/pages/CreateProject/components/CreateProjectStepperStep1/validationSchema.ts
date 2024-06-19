import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  taskPrefix: Yup.string().required("Required"),
});
