import { useState } from 'react';
import styles from './UserBar.module.css';
import avatar1x from '../../assets/images/user_bar/user_avatar_1x.webp';
import avatar2x from '../../assets/images/user_bar/user_avatar_2x.webp';
import iconArrow from '../../assets/images/icons/icons.svg';
import UserBarPopover from '../UserBarPopover/UserBarPopover';

const UserBar = ({ userName }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

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
          <use href={`${iconArrow}#icon-arrow-${isPopoverOpen ? 'up' : 'down'}`}></use>
        </svg>
      </button>
      <UserBarPopover isVisible={isPopoverOpen} />
    </div>
  );
};

export default UserBar;
