import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = ({ onClose }) => {
  return (
    <div className={css.deleteModalContainer}>
      <div className={css.deleteModalTextContainer}>
        <h2 className={css.deleteModalTitle}>Delete entry</h2>
        <p className={css.deleteModalText}>
          Are you sure you want to delete the entry?
        </p>
      </div>
      <div className={css.deleteModalBtnWrapper}>
        <button className={css.deleteModalBtn}>Delete</button>
        <button className={css.deleteModalCancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
