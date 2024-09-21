import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { sendResetPassword } from "../../redux/user/operations";
import css from "./ForgotPassword.module.css";
import Modal from "./Modal";
import MailSentModal from "../Modals/MailSentModal/MailSentModal";

const ForgotPasswordModalContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isMailSentModalOpen, setIsMailSentModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(sendResetPassword(email)).unwrap();
      toast.success("Check your email for the reset link.");

      setIsMailSentModalOpen(true);

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleCloseMailSentModal = () => {
    setIsMailSentModalOpen(false);
  };

  return (
    <>
      <div className={css.modalContent}>
        <h2 className={css.modalTitle}>Reset password</h2>
        <form onSubmit={handleSubmit} className={css.modalForm}>
          <label className={css.modalLabel}>
            <input
              type="email"
              className={css.modalInput}
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={css.modalSubmit}>
            Send email
          </button>
        </form>
        <button className={css.modalClose} onClick={onClose}>
          Close
        </button>
      </div>
      {isMailSentModalOpen && (
        <Modal onClose={handleCloseMailSentModal}>
          <MailSentModal onClose={handleCloseMailSentModal} />
        </Modal>
      )}
    </>
  );
};

export default ForgotPasswordModalContent;
