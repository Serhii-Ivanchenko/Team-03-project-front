import { useSelector } from 'react-redux';
import styles from './ChooseDate.module.css';
import { selectDate } from '../../redux/water/selectors';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long' };
  return `${date.toLocaleDateString('en-US', options).replace(/\s/, ', ')}`;
};

const ChooseDate = () => {
  const today = new Date().toDateString();
  const selectedDate = useSelector(selectDate);
  const formattedSelectedDate = new Date(selectedDate).toDateString();

  const displayDate = formattedSelectedDate === today 
    ? "Today" 
    : formatDate(selectedDate);

  return (
    <div>
      <p className={styles.dateText}>{displayDate}</p>
    </div>
  );
};

export default ChooseDate;
