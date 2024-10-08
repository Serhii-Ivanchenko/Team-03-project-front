import { useState } from 'react';
import styles from './UserBar.module.css';
import iconArrow from '../../assets/images/icons/icons.svg';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';

const UserBar = ({ userName }) => {
  const { name, photo } = useSelector((state) => state.user.userData);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <div className={styles.userBarContainer}>
      <button className={styles.userBar}>
        <span className={styles.userName}>{userName}</span>
        <div className={styles.avatarContainer}>
        <img
          src={photo}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
        </div>
        <svg className={styles.icon} onClick={togglePopover}>
          <use href={`${iconArrow}#icon-arrow-${isPopoverOpen ? 'up' : 'down'}`}></use>
        </svg>
      </button>
      <UserBarPopover isVisible={isPopoverOpen} onClose={closePopover} />    
    </div>
  );
};

export default UserBar;
