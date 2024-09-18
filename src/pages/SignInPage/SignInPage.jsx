import Logo from "../../components/Logo/Logo";
import EditWaterModal from "../../components/Modals/EditWaterModal/EditWaterModal.jsx";
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
