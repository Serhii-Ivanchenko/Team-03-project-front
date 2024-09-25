import { useDispatch } from "react-redux";
import css from "./SignUpForm.module.css";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { register as registerUser } from "../../redux/user/operations";
import { signUpFormSchema } from "../../validationSchemas/authFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import GoogleBtn from "../GoogleBtn/GoogleBtn";
import toast from "react-hot-toast";
// import axios from "axios";
import { useState } from "react";
import iconSprite from "../../assets/images/icons/icons.svg";
import { useTranslation } from "react-i18next";

export const AuthFormLayout = ({ children, className }) => {
  return <div className={clsx(css.layout, { className })}>{children}</div>;
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormSchema(t)),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();

 dispatch(registerUser({ email: newEmail, password }))
   .unwrap()
   .then(() => {
     reset();
     toast.success(t("sign_up.signup_success"));
   })
   .catch((err) => {
     if (err=== 409) {
          toast.error(t("sign_up.user_exists"));
        } else {
          toast.error(t("sign_up.registration_failed"));
        }
   });

    // try {
    //   const resultAction = await dispatch(
    //     registerUser({ email: newEmail, password })
    //   );
    //   if (registerUser.fulfilled.match(resultAction)) {
    //     reset();
    //     toast.success("Registration successful!");
    //   } else if (registerUser.rejected.match(resultAction)) {
    //     const errorStatus = resultAction.payload;
    //     if (errorStatus === 409) {
    //       toast.error("User already exists.");
    //     } else {
    //       toast.error("Registration failed. Please try again.");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    //   toast.error("An unexpected error occurred.");
    // }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleSignUp = async () => {
  //   try {
  //     const response = await axios.get("/users/get-oauth-url");
  //     const { url } = response.data.data;
  //     window.location.href = url;
  //   } catch (error) {
  //     console.error("Error getting Google OAuth URL:", error);
  //     toast.error("Error getting Google OAuth URL");
  //   }
  // };
  // const handleConfirmGoogleAuth = async (code) => {
  //   try {
  //     const response = await axios.post("/confirm-google-auth", { code });
  //     const { token, user } = response.data;

  //     // Dispatch дії для збереження користувача і токену
  //     dispatch(logInWithGoogle({ token, user }));

  //     toast.success("Successfully signed up with Google!");
  //     navigate("/"); // Перенаправлення після успішної авторизації
  //   } catch (error) {
  //     console.error("Error confirming Google Auth:", error);
  //     toast.error("Error during Google Sign Up");
  //   }
  // };
  return (
    <AuthFormLayout className={css.layout}>
      <div className={css.signUpContainer}>
        <h2 className={css.title}>{t("sign_up.title")}</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.field}>
            <span className={css.label}>{t("sign_up.email")}</span>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              placeholder={t("sign_up.email_placeholder")}
              className={clsx(css.input, { [css.inputError]: errors.email })}
            />
            <p className={css.errorMessage}>{errors.email?.message}</p>
          </label>

          <label className={css.field}>
            <span className={css.label}>{t("sign_up.password")}</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder={t("sign_up.password_placeholder")}
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
            <span className={css.label}>{t("sign_up.repeat_password")}</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                placeholder={t("sign_up.repeat_password")}
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

          <input className={css.submit} type="submit" value={t("sign_up.signup_button")} />
        </form>

        <GoogleBtn
          context={t("sign_up.google_signup")}
          onClick={() => {
            // handleGoogleSignUp();
            // dispatch(userSlice(true));
          }}
        />
        <div className={css.inviteOnLogIn}>
          {" "}
          <p className={css.inviteText}>
          {t("sign_up.invite_text")}{" "}
            <Link className={css.link} to="/signin">
            {t("sign_up.sign_in")}
            </Link>
          </p>
        </div>
      </div>
    </AuthFormLayout>
  );
};

export default SignUpForm;
