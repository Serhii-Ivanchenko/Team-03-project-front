import { useSelector } from "react-redux";
import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection";
import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "./SignUpPage.module.css";
import { selectLoadingTracker } from "../../redux/user/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";

const SignUpPage = () => {
   const isLoading = useSelector(selectLoadingTracker);
   return isLoading ? (
     <Loader />
   ) : (
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
