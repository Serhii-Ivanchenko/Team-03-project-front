import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "../../validationSchemas/authFormSchema";
import { AuthFormLayout } from "../SignUpForm/SignUpForm";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { logIn } from "../../redux/user/operations";
import { useState } from "react";
import iconSprite from "../../assets/images/icons/icons.svg";
import ForgotPasswordModalContent from "./ForgotPasswordModalContent";
import Modal from "./Modal";
import toast from "react-hot-toast";
import GoogleBtn from "../GoogleBtn/GoogleBtn";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema(t)),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();

    dispatch(logIn({ email: newEmail, password }))
      .unwrap()
      .then(() => {
        toast.success(t("sign_in.login_success"));
        reset();
      })
      .catch((err) => {
        console.log(err);

        if (err === 409) {
          toast.error(t("sign_in.user_exists"));
        } else {
          toast.error(t("sign_in.generic_error"));
        }
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AuthFormLayout className={css.layout}>
      <div className={css.signInContainer}>
        <h2 className={css.title}>{t("sign_in.title")}</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.field}>
            <span className={css.label}>{t("sign_in.email")}</span>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              placeholder={t("sign_in.email_placeholder")}
              className={clsx(css.input, { [css.inputError]: errors.email })}
            />
            <p className={css.errorMessage}>{errors.email?.message}</p>
          </label>
          <label className={css.field}>
            <span className={css.label}>{t("sign_in.password")}</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder={t("sign_in.password_placeholder")}
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
          <button type="submit" className={css.submit}>
          {t("sign_in.title")}
          </button>
          <p className={css.text}>{t("sign_in.or")}</p>
          <GoogleBtn context={t("sign_in.google_signup")} onClick={() => {}} />
          <button
            type="button"
            className={css.forgotPswBtn}
            onClick={handleOpenModal}
          >
            {t("sign_in.forgot_password")}
          </button>
        </form>

        <div className={css.inviteOnLogIn}>
          <p className={css.inviteText}>
          {t("sign_in.invite_text")}{" "}
            <NavLink to="/signup" className={css.signUpLink}>
            {t("sign_in.sign_up")}
            </NavLink>
          </p>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ForgotPasswordModalContent onClose={handleCloseModal} />
        </Modal>
      )}
    </AuthFormLayout>
  );
};

export default SignInForm;
