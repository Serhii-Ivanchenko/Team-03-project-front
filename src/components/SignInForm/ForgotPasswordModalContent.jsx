import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { sendResetPassword } from "../../redux/user/operations";
import css from "./ForgotPassword.module.css";
import { useTranslation } from "react-i18next";

const ForgotPasswordModalContent = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(sendResetPassword(email))
      .unwrap()
      .then(() => {
        toast.success(t("forgot_password.success_message"));
        onClose();
      })
      .catch(() => {
        toast.error(t("forgot_password.error_message"));
      });
  };

  return (
    <div className={css.modalContent}>
      <h2 className={css.modalTitle}>{t("forgot_password.title")}</h2>
      <form onSubmit={handleSubmit} className={css.modalForm}>
        <label className={css.modalLabel}>
          <input
            type="email"
            className={css.modalInput}
            value={email}
            placeholder={t("forgot_password.email_placeholder")}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={css.modalSubmit}>
        {t("forgot_password.send_email")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordModalContent;
