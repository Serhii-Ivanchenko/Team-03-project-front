import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { sendResetPassword } from "../../redux/user/operations";
import css from "./ForgotPassword.module.css";

const ForgotPasswordModalContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(sendResetPassword(email))
      .unwrap()
      .then(() => {
        toast.success("Check your email for the reset link.");
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
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
    </div>
  );
};

export default ForgotPasswordModalContent;
