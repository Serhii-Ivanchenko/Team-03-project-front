import { FiX } from "react-icons/fi";
import css from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import { getUsersAmount, logOut } from "../../../redux/user/operations.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast.error(t("logout_modal.log_out_error"));
      });
    onClose();
    dispatch(getUsersAmount());
  };

  return (
    <div className={css.logOutModalContainer}>
      <button className={css.modalCloseButton} onClick={onClose}>
        <FiX className={css.closeIcon} />
      </button>
      <div className={css.logOutModalTextContainer}>
        <h2 className={css.logOutModalTitle}>{t("logout_modal.log_out")}</h2>
        <p className={css.logOutModalText}>{t("logout_modal.confirm_leave")}</p>
      </div>
      <div className={css.logOutModalBtnWrapper}>
        <button className={css.logOutModalBtn} onClick={handleLogoutClick}>
          {t("logout_modal.log_out")}
        </button>
        <button className={css.logOutModalCancelBtn} onClick={onClose}>
          {t("logout_modal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
