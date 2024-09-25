import { useTranslation } from "react-i18next";
import { MdRadioButtonChecked } from "react-icons/md";
import { IoMdRadioButtonOff } from "react-icons/io";
import "flag-icons/css/flag-icons.min.css"; // бібліотека для флагів
import css from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const selectedOption = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // зберігаємо обрану мову
  };

  return (
    <div className={css.switcherContainer}>
      <label className={css.radioBtnLabel}>
        <input
          className={css.languageInput}
          type="radio"
          value="en"
          checked={selectedOption === "en"}
          onChange={() => changeLanguage("en")}
        />
        {selectedOption === "en" ? (
          <MdRadioButtonChecked
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        ) : (
          <IoMdRadioButtonOff
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        )}
        <span className="fi fi-gb" style={{ marginLeft: "5px" }} />
      </label>
      <label className={css.radioBtnLabel}>
        <input
          className={css.languageInput}
          type="radio"
          value="uk"
          checked={selectedOption === "uk"}
          onChange={() => changeLanguage("uk")}
        />
        {selectedOption === "uk" ? (
          <MdRadioButtonChecked
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        ) : (
          <IoMdRadioButtonOff
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        )}
        <span className="fi fi-ua" style={{ marginLeft: "5px" }} />
      </label>
    </div>
  );
};
export default LanguageSwitcher;
