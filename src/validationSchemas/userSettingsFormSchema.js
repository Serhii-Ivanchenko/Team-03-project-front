import * as Yup from "yup";

export const userSettingsFormschema = (t) =>
  Yup.object({
    gender: Yup.string()
      .required(t("user_valid.gender_required"))
      .oneOf(["woman", "man"]),
    name: Yup.string()
      .required(t("user_valid.name_required"))
      .min(2, t("user_valid.name_too_short"))
      .max(40, t("user_valid.name_too_long")),
    email: Yup.string()
      .required(t("user_valid.email_required"))
      .email(t("user_valid.email_invalid")),
    weight: Yup.number()
      .typeError(t("user_valid.weight_type_error"))
      .required(t("user_valid.weight_required"))
      .positive(t("user_valid.weight_positive"))
      .min(0, t("user_valid.weight_min"))
      .max(350, t("user_valid.weight_max")),
    activeTime: Yup.number()
      .typeError(t("user_valid.active_time_type_error"))
      .required(t("user_valid.active_time_required"))
      .positive(t("user_valid.active_time_positive"))
      .min(0, t("user_valid.active_time_min"))
      .max(24, t("user_valid.active_time_max")),
    dailyNorm: Yup.number()
      .typeError(t("user_valid.daily_norm_type_error"))
      .required(t("user_valid.daily_norm_required"))
      .positive(t("user_valid.daily_norm_positive"))
      .min(1, t("user_valid.daily_norm_min"))
      .max(15, t("user_valid.daily_norm_max"))
      .test(
        "is-decimal",
        t("user_valid.decimal_error"),
        (value) => (value ? /^\d+(\.\d{1,2})?$/.test(value) : true)
      ),
  });
