import { useTranslation } from "react-i18next";
import css from "./LanguageSwitcher.module.css"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // зберігаємо обрану мову
  };

  return (
    <div className={css.switcherContainer}>
      <label className={css.label}>
        <input
          type="radio"
          value="en"
          checked={i18n.language === "en"}
          onChange={() => changeLanguage("en")}
        />
        En
      </label>
      <label className={css.label}>
        <input
          type="radio"
          value="uk"
          checked={i18n.language === "uk"}
          onChange={() => changeLanguage("uk")}
        />
        Укр
      </label>
    </div>
  );
};
export default LanguageSwitcher