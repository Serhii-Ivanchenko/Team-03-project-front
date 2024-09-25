import css from "./WelcomeSection.module.css";
import Logo from "../../../components/Logo/Logo.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";


const WelcomeSection = () => {
  const { t } = useTranslation();
const[isActive, setIsActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 100);
  }, []);

  return (
    <div className={css.mainContainer}>
      <div
        className=
        {`${css.logoMain} ${css["animation-down"]} ${
          isActive ? css["animation-active"] : ""
        }`}>
        <Logo />
      </div>
      <div
        className={`${css.welcome} ${css["animation-scale"]} ${
          isActive ? css["animation-active"] : ""
        }`}
      >
        <p className={css.descr}>{t("welcome.description")}</p>
        <h1 className={css.title}>{t("welcome.title")}</h1>
        <Link className={css.singup} to="/signup">
          <button className={css.btn}>{t("welcome.try_tracker")}</button>
        </Link>
        <Link className={css.singin} to="/signin">
          <button className={css.btnSingIn}>{t("welcome.sing_in")}</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;
