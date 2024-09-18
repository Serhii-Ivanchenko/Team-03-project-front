import { useSelector } from 'react-redux';
import UserBar from '../UserBar/UserBar';
import styles from './UserPanel.module.css';
import { selectUser } from '../../redux/user/selectors.js';

const UserPanel = ({ userName = 'User' }) => {
  const user = useSelector(selectUser);
  
  return (
    <div className={styles.userPanel}>
      <h2 className={styles.greeting}>
        Hello<span className={styles.userName}>, {user.email}!</span>
      </h2>
      <UserBar userName={userName} />
    </div>
  );
};

export default UserPanel;
