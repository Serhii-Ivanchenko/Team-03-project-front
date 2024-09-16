import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resetPassword } from "../../redux/user/operations";
import css from "./ForgotPassword.module.css";

const ForgotPasswordModalContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword(email));
      toast.success("Check your email");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something wrong. Try again!");
    }
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
            placeholder="Enter your password"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={css.modalSubmit}>
          Reset password{" "}
        </button>
      </form>
      <button className={css.modalClose} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ForgotPasswordModalContent;
