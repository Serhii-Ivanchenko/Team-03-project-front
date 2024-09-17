import css from "./ForgotPassword.module.css";

const Modal = ({ onClose, children }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.modalCloseButton} onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
