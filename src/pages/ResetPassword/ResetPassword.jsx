import { useDispatch } from "react-redux";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPassword.module.css";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../redux/user/operations";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Отримання токену з URL

  const handleResetPassword = async (password) => {
    try {
      await dispatch(resetPassword({ token, password })).unwrap();
      toast.success("Password reset successful!");
    } catch (error) {
      console.error("Password reset failed", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };
  return (
    <div className={css.section}>
      <div className={css.container}>
        <Logo />
        <ResetPasswordForm onSubmit={handleResetPassword} />{" "}
      </div>
      <div className={css.advantSect}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default ResetPassword;
