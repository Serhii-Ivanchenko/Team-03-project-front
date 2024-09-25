import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import css from "./DeleteWaterModal.module.css";
import { useDispatch } from "react-redux";
import { deleteWaterItem } from "../../../redux/water/operations.js";
import toast from "react-hot-toast";

const DeleteWaterModal = ({ onClose, itemId }) => {
  const dispatch = useDispatch();
const { t } = useTranslation();
  
  const handleDeleteClick = () => {
    dispatch(deleteWaterItem(itemId))
      .unwrap()
      .then(() => {
        toast.success("The item has been successfully deleted");
      })
      .catch(() => {
        toast.error("Oops, something went wrong. Please try again.");
      });
    onClose();
  };

  return (
    <div className={css.deleteModalContainer}>
      <button className={css.modalCloseButton} onClick={onClose}>
        <FiX className={css.closeIcon} />
      </button>
      <div className={css.deleteModalTextContainer}>
        <h2 className={css.deleteModalTitle}>{t("delete_water_modal.delete_entry")}</h2>
        <p className={css.deleteModalText}>
        {t("delete_water_modal.delete_confirmation")}
        </p>
      </div>
      <div className={css.deleteModalBtnWrapper}>
        <button className={css.deleteModalBtn} onClick={handleDeleteClick}>
          {t("delete_water_modal.delete")}
        </button>
        <button className={css.deleteModalCancelBtn} onClick={onClose}>
        {t("delete_water_modal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
