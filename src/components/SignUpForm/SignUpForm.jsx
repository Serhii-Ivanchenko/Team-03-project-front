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
import axios from "axios";
import { useState } from "react";
import iconSprite from "../../assets/images/icons/icons.svg";

export const AuthFormLayout = ({ children, className }) => {
  return <div className={clsx(css.layout, { className })}>{children}</div>;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();
    dispatch(registerUser({ email: newEmail, password }));
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await axios.get("/users/get-oauth-url");
      const { url } = response.data.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error getting Google OAuth URL:", error);
      toast.error("Error getting Google OAuth URL");
    }
  };
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
        <h2 className={css.title}>Sign Up</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label
            className={clsx(css.field, { [css.errorField]: errors.email })}
          >
            Email
            <input
              className={clsx(css.input, { [css.inputError]: errors.email })}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
          </label>
          {errors.email && (
            <p className={css.errorsMessage}>{errors.email.message}</p>
          )}

          <label
            className={clsx(css.field, { [css.errorField]: errors.password })}
          >
            Password
            <input
              className={clsx(css.input, { [css.inputError]: errors.password })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
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
          </label>

          {errors.password && (
            <p className={css.errorsMessage}>
              {"must contain at least 8 characters"}
            </p>
          )}

          <label
            className={clsx(css.field, {
              [css.errorField]: errors.confirmPassword,
            })}
          >
            Repeat password
            <input
              className={clsx(css.input, {
                [css.inputError]: errors.confirmPassword,
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Repeat password"
              {...register("confirmPassword", { required: true })}
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
          </label>
          {errors.confirmPassword && (
            <p className={css.errorsMessage}>{"password does not match"}</p>
          )}
          <input className={css.submit} type="submit" value="Sign Up" />
        </form>

        <GoogleBtn
          context={"Sign Up with Google"}
          onClick={() => {
            handleGoogleSignUp();
            // dispatch(userSlice(true));
          }}
        />
        <div className={css.inviteOnLogIn}>
          {" "}
          <p className={css.inviteText}>
            Already have an account?{" "}
            <Link className={css.link} to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthFormLayout>
  );
};

export default SignUpForm;
