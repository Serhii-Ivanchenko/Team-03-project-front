import { useDispatch } from "react-redux";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPassword.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../redux/user/operations";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Отримання токену з URL
  const navigate = useNavigate();

  const handleResetPassword = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

dispatch(resetPassword({ token, password }))
  .unwrap()
  .then(() => {
   toast.success("Password reset successful!");
   navigate("/signin");
  })
  .catch(() => {
   toast.error("Failed to reset password. Please try again.");
  });

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
