import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordFormSchema } from "../../validationSchemas/authFormSchema";
import { AuthFormLayout } from "../SignUpForm/SignUpForm";
import css from "./ResetPasswordForm.module.css";
import clsx from "clsx";
import { useState } from "react";
import iconSprite from "../../assets/images/icons/icons.svg";
import { useTranslation } from "react-i18next";

const ResetPasswordForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthFormLayout className={css.layout}>
      <div className={css.resetPwdContainer}>
        <h2 className={css.title}>{t("reset_pwd.change_password")}</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.field}>
            <span className={css.label}>{t("reset_pwd.password")}</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder={t("reset_pwd.enter_new_password")}
                className={clsx(css.input, {
                  [css.inputError]: errors.password,
                })}
              />
              <button
                className={css.showPasswordBtn}
                type="button"
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <svg className={css.icon}>
                    <use href={`${iconSprite}#icon-eye-off`}></use>
                  </svg>
                ) : (
                  <svg className={css.icon}>
                    <use href={`${iconSprite}#icon-eye`}></use>
                  </svg>
                )}
              </button>
            </div>
            <p className={css.errorMessage}>{errors.password?.message}</p>
          </label>

          <label className={css.field}>
            <span className={css.label}>{t("reset_pwd.confirm_password")}</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                placeholder={t("reset_pwd.enter_new_password")}
                className={clsx(css.input, {
                  [css.inputError]: errors.confirmPassword,
                })}
              />
              <button
                className={css.showPasswordBtn}
                type="button"
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <svg className={css.icon}>
                    <use href={`${iconSprite}#icon-eye-off`}></use>
                  </svg>
                ) : (
                  <svg className={css.icon}>
                    <use href={`${iconSprite}#icon-eye`}></use>
                  </svg>
                )}
              </button>
            </div>
            <p className={css.errorMessage}>
              {errors.confirmPassword?.message}
            </p>
          </label>
          <button type="submit" className={css.submit}>
          {t("reset_pwd.change_password")}
          </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

export default ResetPasswordForm;
