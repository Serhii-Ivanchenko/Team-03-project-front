import styles from './UserBar.module.css';

const UserBar = ({ userName }) => {
  return (
    <button className={styles.userBar}>
      <img
        src="https://via.placeholder.com/40"
        alt={`${userName}'s avatar`}
        className={styles.avatar}
      />
      <span className={styles.userName}>{userName}</span>
    </button>
  );
};

export default UserBar;
