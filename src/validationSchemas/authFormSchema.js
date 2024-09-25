import * as Yup from "yup";

export const signUpFormSchema = (t) => Yup.object({
  email: Yup.string().email(t("auth_valid.invalid_email")).required(t("auth_valid.email_required")),
  password: Yup.string()
    .min(8, t("auth_valid.password_min"))
    .max(64, t("auth_valid.password_max"))
    .required(t("auth_valid.password_required")),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    t("auth_valid.passwords_must_match")
  ),
});

export const signInFormSchema = (t) => Yup.object({
  email: Yup.string().email(t("auth_valid.invalid_email")).required(t("auth_valid.email_required")),
  password: Yup.string().min(8, t("auth_valid.incorrect_password")).max(64).required("auth_valid.password_required"),
});

export const resetPasswordFormSchema = (t) => Yup.object({
  password: Yup.string()
    .min(8, t("auth_valid.password_min"))
    .max(64, t("auth_valid.password_max"))
    .required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    t("auth_valid.passwords_must_match")
  ),
});
