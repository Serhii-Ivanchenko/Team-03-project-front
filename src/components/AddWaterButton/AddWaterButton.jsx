import  { useState } from 'react';
import styles from './AddWaterButton.module.css';
import iconPlus from '../../assets/images/icons/icons.svg';
import Modal from '../Modal/Modal';
import EditWaterModal from '../Modals/EditWaterModal/EditWaterModal';

const AddWaterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('Opening modal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.addWaterButton} onClick={openModal}>
        <div className={styles.containerSvg}>
          <svg className={styles.icon}>
            <use href={`${iconPlus}#icon-plus`}></use>
          </svg>
        </div>
        <span className={styles.text}>Add water</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <EditWaterModal onClose={closeModal} />
      </Modal>
    </>
  );
};

export default AddWaterButton;
