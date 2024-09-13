import { FaEdit, FaTrash } from 'react-icons/fa'; 
import styles from './WaterItem.module.css';

const WaterItem = ({ quantity, time, onEdit, onDelete }) => {
  return (
    <div className={styles.waterItem}>
      <div className={styles.info}>
        <p className={styles.quantity}>{quantity}</p>
        <p className={styles.time}>{time}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={onEdit}>
          <FaEdit className={styles.icon} />
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          <FaTrash className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default WaterItem;