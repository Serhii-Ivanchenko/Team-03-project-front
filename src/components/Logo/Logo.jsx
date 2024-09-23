import css from "./Logo.module.css";
 import myIcon from "../../assets/images/icons/icons.svg";
 import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"


const Logo = () => {
  return (
    <div className={css.logo_lang}>
      <svg className={css.logo} width={114} height={20}>
        <use className={css.logoicon} href={`${myIcon}#icon-AquaTrack`}></use>
      </svg>
      <LanguageSwitcher /> {/*Перемикач мови*/}
    </div>
  );
}

export default Logo