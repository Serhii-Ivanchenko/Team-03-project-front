import css from "./ForgotPassword.module.css";
import { FiX } from "react-icons/fi";

const Modal = ({ onClose, children }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.modalCloseButton} onClick={onClose}>
          <FiX className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
