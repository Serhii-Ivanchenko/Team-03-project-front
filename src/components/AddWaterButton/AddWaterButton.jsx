import styles from './AddWaterButton.module.css';
import iconPlus from '../../assets/images/icons/icons.svg';


const AddWaterButton = ({ onClick }) => {
  return (
    <button className={styles.addWaterButton} onClick={onClick}>
      <div className={styles.containerSvg}>
      <svg className={styles.icon}>
        <use href={`${iconPlus}#icon-plus`}></use>
      </svg>
      </div>
      <span className={styles.text}>Add water</span>
    </button>
  );
};

export default AddWaterButton;
