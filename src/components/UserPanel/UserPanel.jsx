import UserBar from '../UserBar/UserBar';
import styles from './UserPanel.module.css';

const UserPanel = ({ userName = 'User' }) => {
  return (
    <div className={styles.userPanel}>
      <h2 className={styles.greeting}>
        Hello<span className={styles.userName}>, {userName}!</span>
      </h2>
      <UserBar userName={userName} />
    </div>
  );
};

export default UserPanel;
