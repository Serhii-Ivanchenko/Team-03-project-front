import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <div className={css.section}>
      <div className={css.container}>
        <Logo />
        <SignInForm />
      </div>
      <div className={css.advantSect}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;
