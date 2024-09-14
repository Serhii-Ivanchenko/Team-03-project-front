import styles from './AddWaterButton.module.css';
import iconPlus from '../../assets/images/icons/icons.svg';


const AddWaterButton = ({ onClick }) => {
  return (
    <button className={styles.addWaterButton} onClick={onClick}>
      <svg className={styles.icon}>
        <use href={`${iconPlus}#icon-plus-in-circle`}></use>
      </svg>
      <span className={styles.text}>Add water</span>
    </button>
  );
};

export default AddWaterButton;
