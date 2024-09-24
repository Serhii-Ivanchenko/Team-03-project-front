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
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();

    dispatch(registerUser({ email: newEmail, password }))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Registration successful!");
      })
      .catch((err) => {
        if (err === 409) {
          toast.error("User already exists.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <AuthFormLayout className={css.layout}>
      <div className={css.signUpContainer}>
        <h2 className={css.title}>Sign Up</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.field}>
            <span className={css.label}>Email </span>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              placeholder="Enter your email"
              className={clsx(css.input, { [css.inputError]: errors.email })}
            />
            <p className={css.errorMessage}>{errors.email?.message}</p>
          </label>

          <label className={css.field}>
            <span className={css.label}>Password </span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Enter your password"
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
            <span className={css.label}> Repeat password</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                placeholder="Repeat password"
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

          <input className={css.submit} type="submit" value="Sign Up" />
        </form>

        <GoogleBtn context={"Sign Up with Google"} onClick={() => {}} />
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
