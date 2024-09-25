import { useSelector } from 'react-redux';
import UserBar from '../UserBar/UserBar';
import styles from './UserPanel.module.css';
import { selectUser } from '../../redux/user/selectors';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  const userName = user?.name || (user?.email ? user.email.split('@')[0] : 'User'); 

  return (
    <div className={styles.userPanel}>
      <h2 className={styles.greeting}>
        {t("user_greeting")}<span className={styles.userName}>, {userName}!</span>
      </h2>
      <UserBar userName={userName} />
    </div>
  );
};

export default UserPanel;
