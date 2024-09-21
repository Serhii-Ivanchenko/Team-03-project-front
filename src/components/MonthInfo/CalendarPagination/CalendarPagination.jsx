import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getMonthWaterByMonth} from "../../../redux/water/operations.js";
import {selectMonthWaterItems,selectDate, } from "../../../redux/water/selectors.js";
import {selectUser} from '../../../redux/user/selectors.js'
import css from './CalendarPagination.module.css';
import myIcon from '../../../assets/images/icons/icons.svg'
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from 'react';
import Calendar from '../Calendar/Calendar.jsx';

 

function addMonths(date, months) {
  let result = new Date(date);
  let expectedMonth = ((result.getMonth() + months) % 12 + 12) % 12; // Этот метод позволяет оставаться в пределах индексов месяцев от 0 до 11
  result.setMonth(result.getMonth() + months);
  
  // Если произошло переполнение, исправляем
  if (result.getMonth() !== expectedMonth) {
    result.setDate(0); // Таким образом мы возвращаемся к концу предыдущего месяца.
  }
  return result;
}


export default function CalendarPagination() {
const dispatch = useDispatch();
  const waterMonthData = useSelector(selectMonthWaterItems);
  const waterSelectDate = useSelector(selectDate);
   const userData = useSelector(selectUser);
  //  const isLoadingTracker = useSelector(selectLoadingTracker);
  
  const waterDailyNorm = userData.dailyNorm;
  // console.log("waterDailyNorm", waterDailyNorm);
  // console.log("waterSelectDate", waterSelectDate);

   const [ queryMonth, setQueryMonth ] = useState( new Date());

   const handleClickRight = () => {
    setQueryMonth(addMonths(queryMonth,1))
  };

   const handleClickLeft = () => {
     setQueryMonth(addMonths(queryMonth,-1))
  };
  
  const calendarClick = () => {
   
  }
 
// console.log(queryMonth)
const options = {
  month: 'long',
  year: 'numeric'
};

  let strMonth = queryMonth.toLocaleString("en-US", options);
  let calendarMonth = queryMonth.toISOString().substring(0, 7);
  
   useEffect(() => {
     const fetchWaterData = async () => {
       await Promise.all([
         // dispatch(getUserData()),
         // dispatch(getDayWaterByDate("2024-09-12")),
         dispatch(getMonthWaterByMonth(calendarMonth)),
       ]);
     };

     fetchWaterData();
   }, [dispatch, calendarMonth, waterDailyNorm]);

  // console.log("waterMonthData", waterMonthData);

  // console.log(calendarMonth);
  return (
    <div className={css.containerpagin}>
      <div className={css.mainbox}>
        <p className={css.name}>Month</p>
        <div className={css.mainboxpagination}>
          <div className={css.boxpagination}>
            <button className={css.iconstep} onClick={handleClickLeft}>
              <FiChevronLeft className={css.arrowIcon} />
            </button>
            <p className={css.namemonth}> {strMonth} </p>
            <button className={css.iconstep} onClick={handleClickRight}>
              <FiChevronRight className={css.arrowIcon} />
            </button>
          </div>

          <div className={css.pieIconWrapper}>
            <svg className={css.iconpie}>
              <use href={`${myIcon}#icon-pie-chart-02`}></use>
            </svg>
          </div>
        </div>
      </div>
      <Calendar
        monthData={waterMonthData}
        waterDailyNorm={waterDailyNorm}
        waterSelectDate={waterSelectDate}
        onCalendarClick={calendarClick}
      />
    </div>
  );
}

