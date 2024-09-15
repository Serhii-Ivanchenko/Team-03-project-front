import Logo from "../../components/HomePage/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <div className={css.container}>
      <Logo />
      <SignInForm />
    </div>
  );
};

export default SignInPage;
