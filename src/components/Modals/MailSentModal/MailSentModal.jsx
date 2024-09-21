import css from "./MailSentModal.module.css";

const MailSentModal = ({ onClose }) => {
  return (
    <div className={css.modalContent}>
      <h2 className={css.modalTitle}>Mail sent</h2>
      <p>Check your email</p>
      <button className={css.modalClose} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default MailSentModal;
