import styles from './UserBarPopover.module.css';
import iconMenu from "../../assets/images/icons/icons.svg";

const UserBarPopover = () => {
  return (
    <div className={styles.popover}>
      <button className={styles.button}>
        <svg className={styles.icon}>
          <use href={`${iconMenu}#icon-settings`}></use>
        </svg>
        Settings
      </button>
      <button className={styles.buttonOut}>
        <svg className={styles.iconOut}>
          <use href={`${iconMenu}#icon-log-out`}></use>
        </svg>
        Log out
      </button>
    </div>
  );
};
export default UserBarPopover;
