import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordFormSchema } from "../../validationSchemas/authFormSchema";
import { AuthFormLayout } from "../SignUpForm/SignUpForm";
import css from "./ResetPasswordForm.module.css";
import clsx from "clsx";
import { useState } from "react";
import iconSprite from "../../assets/images/icons/icons.svg";
// import toast from "react-hot-toast";
// import { resetPassword } from "../../redux/user/operations";

const ResetPasswordForm = ({ onSubmit }) => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // const onSubmit = async (data) => {
  //   const { password } = data;

  //   dispatch(resetPassword({ password }))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Password has been reset successfully!");
  //       reset();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Password reset failed. Please try again.");
  //     });
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthFormLayout className={css.layout}>
      <div className={css.resetPwdContainer}>
        <h2 className={css.title}>Change your password</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.field}>
            <span className={css.label}>Password </span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Enter new password"
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
            <span className={css.label}> Confirm password</span>
            <div className={css.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                placeholder="Enter new password"
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
            Change Password
          </button>
        </form>
      </div>
    </AuthFormLayout>
  );
};

export default ResetPasswordForm;
