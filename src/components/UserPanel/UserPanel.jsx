import UserBar from './UserBar';
import styles from './UserPanel.module.css';

const UserPanel = ({ userName }) => {
  return (
    <div className={styles.userPanel}>
      <h2 className={styles.greeting}>Hello, {userName}!</h2>
      <UserBar userName={userName} />
    </div>
  );
};

export default UserPanel;
