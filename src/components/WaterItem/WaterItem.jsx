import styles from "./WaterItem.module.css";
import iconUpdate from "../../assets/images/icons/icons.svg";

const WaterItem = ({ quantity, time }) => {
  return (
    <li className={styles.item}>
      <div className={styles.iconContainer}>
        <svg className={styles.icon}>
          <use href={`${iconUpdate}#icon-mage_water-glass-fill`}></use>
        </svg>
      </div>
      <div className={styles.info}>
        <p className={styles.quantity}>
          {quantity}<span className={styles.unit}></span>
        </p>
        <p className={styles.time}>
          {time}<span className={styles.unit}></span>
        </p>
      </div>
      <div className={styles.actionIconsContainer}>
        <svg className={styles.iconAction}>
          <use href={`${iconUpdate}#icon-edit-2`}></use>
        </svg>
        <svg className={styles.iconAction}>
          <use href={`${iconUpdate}#icon-trash-04`}></use>
        </svg>
      </div>
    </li>
  );
};

export default WaterItem;
