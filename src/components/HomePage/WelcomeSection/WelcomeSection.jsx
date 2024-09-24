import css from "./WelcomeSection.module.css";
import Logo from "../../../components/Logo/Logo.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.mainContainer}>
      <div className={css.logoMain}>
        <Logo />
      </div>
      <div className={css.welcome}>
        <p className={css.descr}>{t('welcome.description')}</p>
        <h1 className={css.title}>{t('welcome.title')}</h1>
        <Link className={css.singup} to="/signup">
          <button className={css.btn}>{t('welcome.try_tracker')}</button>
        </Link>
        <Link className={css.singin} to="/signin">
          <button className={css.btnSingIn}>{t('welcome.sing_in')}</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;
