import { useSelector } from 'react-redux';
import styles from './ChooseDate.module.css';
import {selectDate} from '../../redux/water/selectors';
import { useTranslation } from 'react-i18next';


const formatDate = (dateString, language) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long' };
  return `${date.toLocaleDateString(language, options).replace(/\s/, ', ')}`;
};

const ChooseDate = () => {

  const { t, i18n } = useTranslation();
  const today = new Date().toDateString();
  const selectedDate = useSelector(selectDate);
  const formattedSelectedDate = new Date(selectedDate).toDateString();

  const displayDate = formattedSelectedDate === today 
    ? t('today') 
    : formatDate(selectedDate, i18n.language);

  return (
    <div>
      <p className={styles.dateText}>{displayDate}</p>
    </div>
  );
};

export default ChooseDate;
