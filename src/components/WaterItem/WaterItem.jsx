import styles from "./WaterItem.module.css";
import iconUpdate from "../../assets/images/icons/icons.svg";
import { useEffect, useState } from "react";
import Modal from '../Modal/Modal';
import DeleteWaterModal from '../Modals/DeleteWaterModal/DeleteWaterModal';
import EditWaterModal from '../Modals/EditWaterModal/EditWaterModal';


const WaterItem = ({ quantity, time }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = () => {
    if (!isDeleteModalOpen) {
      setIsDeleteModalOpen(true);
      console.log('Opening delete modal');
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    console.log('Closing delete modal');
  };

  const openEditModal = () => {
    if (!isEditModalOpen) {
      setIsEditModalOpen(true);
      console.log('Opening edit modal');
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    console.log('Closing edit modal');
  };

  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      console.log('A modal is open');
    } else {
      console.log('No modals are open');
    }

    return () => {
      console.log('Cleaning up modals');
    };
  }, [isEditModalOpen, isDeleteModalOpen]);

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
        <button className={styles.iconButton} onClick={openEditModal} aria-label="Edit">
          <svg className={styles.iconAction}>
            <use href={`${iconUpdate}#icon-edit-2`}></use>
          </svg>
        </button>
        <button className={styles.iconButton} onClick={openDeleteModal} aria-label="Delete">
          <svg className={styles.iconAction}>
            <use href={`${iconUpdate}#icon-trash-04`}></use>
          </svg>
        </button>
      </div>

      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
          <EditWaterModal onClose={closeEditModal} />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DeleteWaterModal onClose={closeDeleteModal} />
        </Modal>
      )}
    </li>
  );
};

export default WaterItem;