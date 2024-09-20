import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import css from "./ResetPassword.module.css";

const ResetPassword = () => {
  return (
    <div className={css.section}>
      <div className={css.container}>
        <Logo />
        <ResetPasswordForm />
      </div>
      <div className={css.advantSect}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default ResetPassword;
