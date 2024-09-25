import { useDispatch } from "react-redux";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPassword.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../redux/user/operations";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleResetPassword = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error(t("reset_pwd.passwords_do_not_match"));
      return;
    }

dispatch(resetPassword({ token, password }))
  .unwrap()
  .then(() => {
   toast.success(t("reset_pwd.password_reset_successful"));
   navigate("/signin");
  })
  .catch(() => {
   toast.error(t("reset_pwd.failed_to_reset_password"));
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
