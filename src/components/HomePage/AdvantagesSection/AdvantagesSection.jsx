import css from "./AdvantagesSection.module.css";
import firstGirl1x from "../../../assets/images/main_page/first_girl_avatar_1x.webp";
import firstGirl2x from "../../../assets/images/main_page/first_girl_avatar_2x.webp";
import boy1x from "../../../assets/images/main_page/boy_avatar_1x.webp";
import boy2x from "../../../assets/images/main_page/boy_avatar_2x.webp";
import secondGirl1x from "../../../assets/images/main_page/second_girl_avatar_1x.webp";
import secondGirl2x from "../../../assets/images/main_page/second_girl_avatar_2x.webp";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.advSection}>
      <div className={css.happyContainer}>
        <ul className={css.happyList}>
          <li className={css.happyItem}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${firstGirl1x} 1x, ${firstGirl2x} 2x`}
              />
              <img
                className={css.happyImage}
                src={firstGirl1x}
                srcSet={`${firstGirl1x} 1x, ${firstGirl2x} 2x`}
                alt="happy-girl"
                loading="lazy"
                width="28"
                height="28"
              />
            </picture>
          </li>
          <li className={css.happyItem}>
            <picture>
              <source type="image/webp" srcSet={`${boy1x} 1x, ${boy1x} 2x`} />
              <img
                className={css.happyImage}
                src={boy1x}
                srcSet={`${boy1x} 1x, ${boy2x} 2x`}
                alt="happy-boy"
                loading="lazy"
                width="28"
                height="28"
              />
            </picture>
          </li>
          <li className={css.happyItem}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${secondGirl1x} 1x, ${secondGirl2x} 2x`}
              />
              <img
                className={css.happyImage}
                src={secondGirl1x}
                srcSet={`${secondGirl2x} 1x, ${secondGirl2x} 2x`}
                alt="happy-girl"
                loading="lazy"
                width="28"
                height="28"
              />
            </picture>
          </li>
        </ul>

        <div className={css.happyCustomers}>
          <p className={css.happyText}>
            {t("advantages.our")}
            <span className={css.accent}> {t("advantages.happy")} </span>
            {t("advantages.customers")}
          </p>
        </div>
      </div>
      <div className={css.btnWrapper}>
        <div className={css.infoStaticsBtn}>
          <button className={css.habitbtn}>
            <span className={css.circle}></span>
            {t("advantages.habit_drive")}
          </button>
          <button className={css.statistics}>
            {t("advantages.view_statistics")}
          </button>
        </div>
        <div className={css.ratebtn}>
          <button className={css.rate}>{t("advantages.personal_rate")}</button>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
