import { useState } from 'react';
import styles from './AddWaterButton.module.css';
import iconPlus from '../../assets/images/icons/icons.svg';
import Modal from '../Modal/Modal';
import AddWaterModal from '../Modals/AddWaterModal/AddWaterModal';

const AddWaterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.addWaterButton}>
        <div className={styles.containerSvg} onClick={openModal}>
          <svg className={styles.icon}>
            <use href={`${iconPlus}#icon-plus`}></use>
          </svg>
        </div>
        <span className={styles.text}>Add water</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddWaterModal onClose={closeModal} />
      </Modal>
    </>
  );
};

export default AddWaterButton;
