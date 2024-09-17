import styles from './UserBarPopover.module.css';
import iconMenu from '../../assets/images/icons/icons.svg';
import Modal from '../Modal/Modal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import LogOutModal from '../Modals/LogOutModal/LogOutModal';
import { useState } from 'react';

const UserBarPopover = ({ isVisible }) => {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);

  const openSettingsModal = () => setSettingsModalOpen(true);
  const closeSettingsModal = () => setSettingsModalOpen(false);

  const openLogOutModal = () => setLogOutModalOpen(true);
  const closeLogOutModal = () => setLogOutModalOpen(false);

  return (
    <div className={`${styles.popover} ${!isVisible ? styles.hidden : ''}`}>
      <button className={styles.button} onClick={openSettingsModal}>
        <svg className={styles.icon}>
          <use href={`${iconMenu}#icon-settings`}></use>
        </svg>
        Settings
      </button>
      <button className={styles.buttonOut} onClick={openLogOutModal}>
        <svg className={styles.iconOut}>
          <use href={`${iconMenu}#icon-log-out`}></use>
        </svg>
        Log out
      </button>

      {isSettingsModalOpen && (
        <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
          <UserSettingsForm />
        </Modal>
      )}

      {isLogOutModalOpen && (
        <Modal isOpen={isLogOutModalOpen} onClose={closeLogOutModal}>
          <LogOutModal />
        </Modal>
      )}
    </div>
  );
};

export default UserBarPopover;
