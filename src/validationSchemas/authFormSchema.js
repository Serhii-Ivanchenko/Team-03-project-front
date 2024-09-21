import * as Yup from "yup";

export const signUpFormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8, "must contain at least 8 characters")
    .max(64)
    .required("password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "passwords must match"
  ),
});

export const signInFormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8, "incorrect password").max(64).required(),
});
