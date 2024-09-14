import styles from './UserBar.module.css';
import avatar1x from '../../assets/images/user_bar/user_avatar_1x.webp';
import avatar2x from '../../assets/images/user_bar/user_avatar_2x.webp';
import iconArrow from '../../assets/images/icons/icons.svg';

import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useEffect } from 'react';
import { useState } from 'react';

const UserBar = ({ userName }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles.userBar}`)) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className={styles.userBarContainer}>
      <button className={styles.userBar} onClick={togglePopover}>
      <span className={styles.userName}>{userName}</span>
        <img
          src={avatar1x}
          srcSet={`${avatar1x} 1x, ${avatar2x} 2x`}
          alt={`${userName}'s avatar`}
          className={styles.avatar}
        />
         <svg className={styles.icon}>
          <use href={`${iconArrow}#icon-arrow-down`}></use>
        </svg>
      </button>
      {isPopoverOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
