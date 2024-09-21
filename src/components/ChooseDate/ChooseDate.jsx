// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChooseDate.module.css';
import {selectDate} from '../../redux/water/selectors';
// import {getDayWaterByDate} from '../../redux/water/operations';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long' };
  return `${date.toLocaleDateString('en-US', options).replace(/\s/, ', ')}`;
};

const ChooseDate = () => {
  const currentDate = new Date().toLocaleDateString();
  const selectedDate = useSelector(selectDate);

  const displayDate = selectedDate === currentDate 
    ? "Today" 
    : formatDate(selectedDate);

  return (
    <div>
      <p className={styles.dateText}>{displayDate}</p>
    </div>
  );
};

export default ChooseDate;