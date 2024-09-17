import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <div className={css.section}>
      <div className={css.container}>
        <Logo />
        <SignUpForm />
      </div>
      <div className={css.advantSect}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignUpPage;
