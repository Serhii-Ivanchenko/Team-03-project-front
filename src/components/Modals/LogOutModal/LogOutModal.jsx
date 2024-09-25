import { FiX } from "react-icons/fi";
import css from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import { getUsersAmount, logOut } from "../../../redux/user/operations.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logOut()).unwrap()
          .then(() => {
            navigate("/");
          })
          .catch(() => {
            toast.error("Logout failed. Please try again.");
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
        <h2 className={css.logOutModalTitle}>Log out</h2>
        <p className={css.logOutModalText}>Do you really want to leave?</p>
      </div>
      <div className={css.logOutModalBtnWrapper}>
        <button className={css.logOutModalBtn} onClick={handleLogoutClick}>
          Log out
        </button>
        <button className={css.logOutModalCancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
