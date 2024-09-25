import css from "./EditWaterModal.module.css";
import iconSprite from "../../../assets/images/icons/icons.svg";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const EditWaterModal = ({onClose}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className={css.editModalContainer}>
      <div className={css.editModalTextContainer}>
        <h2 className={css.editModalTitle}>{t("edit_water_modal.edit_amount")}</h2>
        <h3 className={css.editModalSubTitle}>{t("edit_water_modal.correct_data")}</h3>
      </div>

      <div className={css.editModalCounterContainer}>
        <p className={css.editModalCounterTitle}>{t("add_water_modal.amount_water")}</p>
        <div className={css.editModalCounter}>
          <button className={css.editModalCounterButtonMinus}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-minus-in-circle`}></use>
            </svg>
          </button>
          <p className={css.editModalCounterText}>250{t("add_water_modal.ml")}</p>
          <button className={css.editModalCounterButtonPlus}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-plus-in-circle`}></use>
            </svg>
          </button>
        </div>
        <p className={css.editModalCounterTitle}>{t("add_water_modal.recording_time")}</p>
        <form>
          <label>
            <input className={css.formInput} placeholder="7:00" />
          </label>
          {/* type="time" Поставити в інпут для можливості обирати час */}
          <h3 className={css.editModalTitleWaterUsed}>
          {t("add_water_modal.enter_water")}
          </h3>
          <label>
            <input className={css.formInput} type="text" placeholder="250" />
          </label>
        </form>
        <button onClick={onClose} type="submit" className={css.submitBtn}>
        {t("add_water_modal.save")}
        </button>

        <button onClick={onClose} className={css.closeBtn}>
          <svg className={css.iconClose}>
            <use href={`${iconSprite}#icon-x`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditWaterModal;
