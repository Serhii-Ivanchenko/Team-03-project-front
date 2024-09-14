import "./LogOutModal.models.css";

const LogOutModal = () => {
  return (
    <div className={css.logOutModalContainer}>
      <div className={css.logOutModalTextContainer}>
        <h2 className={css.logOutModalTitle}>Log out</h2>
        <p className={css.logOutModalText}>Do you really want to leave?</p>
      </div>
      <div className={css.logOutModalBtnWrapper}>
        <button className={css.logOutModalBtn}>Log out</button>
        <button className={css.logOutModalCancelBtn}>Cancel</button>
      </div>
    </div>
  );
};

export default LogOutModal;
