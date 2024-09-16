import css from "./WelcomeSection.module.css";
import Logo from "../../../components/Logo/Logo.jsx";
import { Link } from "react-router-dom";
import LogOutModal from "./../../Modals/LogOutModal/LogOutModal.jsx";

const WelcomeSection = () => {
  return (
    <div className={css.mainContainer}>
      <Logo className={css.logoMain} />
      <div className={css.welcome}>
        <p className={css.descr}>Record daily water intake and track</p>
        <h1 className={css.title}>Water consumption tracker</h1>
        <Link className={css.singup} to="/signup">
          <button className={css.btn}>Try Tracker</button>
        </Link>
        <Link className={css.singin} to="/signin">
          <button className={css.btnSingIn}>Sing In</button>
        </Link>
      </div>
      <div>
        <LogOutModal />
      </div>
    </div>
  );
};

export default WelcomeSection;
