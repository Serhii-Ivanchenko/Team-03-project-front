import * as Yup from "yup";

export const userSettingsFormschema = Yup.object({
  gender: Yup.string()
    .required("Gender should be required")
    .oneOf(["woman", "man"]),
  name: Yup.string()
    .required("Name should be required")
    .min(2, "Too Short!")
    .max(40, "Too Long!"),
  email: Yup.string()
    .required("Email should be required")
    .email("Must be a valid email"),
  weight: Yup.number()
    .typeError("Weight should be a number")
    .required("Weight should be required")
    .positive("Weight should be a positive number")
    .min(0, "Weight should be 0 or more kg")
    .max(350, "Weight should be less than 350 kg"),
  activeTime: Yup.number()
    .typeError("Active Time should be a number")
    .required("Active time should be required")
    .positive("Active Time should be a positive number")
    .min(0, "Active Time should be 0 or more hours")
    .max(24, "Active Time should be less than 24 hours"),
  dailyNorm: Yup.number()
    .typeError("Daily norma should be a number")
    .required("Daily norma time should be required")
    .positive("Daily norma should be a positive number")
    .min(1, "Daily norma should be more than 1 liter")
    .max(15, "Daily norma should be less than 15 liters")
    .test(
      "is-decimal",
      "Daily norm should have up to two decimal places",
      (value) => (value ? /^\d+(\.\d{1,2})?$/.test(value) : true)
    ),
});
