import css from "./WelcomeSection.module.css";
import Logo from "../../../components/Logo/Logo.jsx";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.logoMain}>
        <Logo />
      </div>
      <div className={css.welcome}>
        <p className={css.descr}>Record daily water intake and track</p>
        <h1 className={css.title}>Water consumption tracker</h1>
        <Link className={css.singup} to="/signup">
          <button className={css.btn}>Try tracker</button>
        </Link>
        <Link className={css.singin} to="/signin">
          <button className={css.btnSingIn}>Sing In</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;
