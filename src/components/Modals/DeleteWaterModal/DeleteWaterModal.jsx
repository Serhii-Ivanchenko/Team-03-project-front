import { useTranslation } from "react-i18next";
import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className={css.deleteModalContainer}>
      <div className={css.deleteModalTextContainer}>
        <h2 className={css.deleteModalTitle}>{t("delete_water_modal.delete_entry")}</h2>
        <p className={css.deleteModalText}>
        {t("delete_water_modal.delete_confirmation")}
        </p>
      </div>
      <div className={css.deleteModalBtnWrapper}>
        <button className={css.deleteModalBtn}>{t("delete_water_modal.delete")}</button>
        <button className={css.deleteModalCancelBtn} onClick={onClose}>
        {t("delete_water_modal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
