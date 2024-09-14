import { useDispatch } from "react-redux";
import css from "./SignUpForm.module.css";
import { useForm } from "react-hook-form";
import clsx from "clsx";
// import { createContext, useContext } from "react";
import { register as registerUser } from "../../redux/auth/operations";
import { signUpFormSchema } from "../../validationSchemas/authFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import GoogleBtn from "../GoogleBtn/GoogleBtn";
import { showOnboarding } from "../../redux/auth/slice";
import toast from "react-hot-toast";
import { AXIOS_INSTANCE } from "../../redux/constants";

// const modalContext = createContext();
// const useModal = () => useContext(modalContext);

export const AuthFormLayout = ({ children, className }) => {
  return <div className={clsx(css.layout, { className })}>{children}</div>;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  //   const { openModal } = useModal();

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
    // openModal();
  };

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
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
              //   type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
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
              //   type={showPassword ? "text" : "password"}
              placeholder="Repeat password"
              {...register("confirmPassword", { required: true })}
            />
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
            dispatch(showOnboarding(true));
          }}
        />
        <div className={css.inviteOnLogIn}>
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

const handleGoogleSignUp = async () => {
  try {
    const response = await AXIOS_INSTANCE.get("users/get-oauth-url");
    const { url } = response.data.data;
    window.location.href = url;
  } catch (error) {
    console.log(error);
    toast.error("Error getting Google OAuth URL");
  }
};

export default SignUpForm;
