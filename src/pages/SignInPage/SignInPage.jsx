import { useSelector } from "react-redux";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import css from "./SignInPage.module.css";
import { selectLoadingTracker } from "../../redux/user/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";

const SignInPage = () => {
    const isLoading = useSelector(selectLoadingTracker);
  return isLoading ? (
    <Loader />
  ) : (
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
