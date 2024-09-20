import { useDispatch, useSelector } from "react-redux";
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
import { selectError } from "../../redux/user/selectors.js";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

// const error = useSelector(selectError);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();

    dispatch(logIn({ email: newEmail, password }))
      .unwrap()
      .then(() => {
          toast.success("Logged in successfully!");
          reset();
      })
      .catch((err) => {
        console.log(err);
        
        if (err === 409) {
          toast.error("User already exists.");
        } else {
          toast.error("Login failed. Please try again.");

        }
      });
    
    // try {
    //   const resultAction = await dispatch(logIn({ email: newEmail, password }));

    //   if (logIn.fulfilled.match(resultAction)) {
    //     toast.success("Logged in successfully!");
    //     reset();
    //   } else if (logIn.rejected.match(resultAction)) {
    //     const errorStatus = resultAction.payload;
    //     if (errorStatus === 401) {
    //       toast.error("Wrong email or password.");
    //     } else if (errorStatus === 409) {
    //       toast.error("User already exists.");
    //     } else {
    //       toast.error("Login failed. Please try again.");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   toast.error("An unexpected error occurred.");
    // }
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
        <h2 className={css.title}>Sign In</h2>
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
          <button type="submit" className={css.submit}>
            Sign in
          </button>
          <button
            type="button"
            className={css.forgotPswBtn}
            onClick={handleOpenModal}
          >
            Forgot password?
          </button>
        </form>
        <div className={css.inviteOnLogIn}>
          <p className={css.inviteText}>
            Don`t have an account?{" "}
            <NavLink to="/signup" className={css.signUpLink}>
              Sign Up
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
