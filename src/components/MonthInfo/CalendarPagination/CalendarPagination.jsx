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
import { useTranslation } from "react-i18next";

 

function addMonths(date, months) {
  let result = new Date(date);
  let expectedMonth = ((result.getMonth() + months) % 12 + 12) % 12; 
  result.setMonth(result.getMonth() + months);
  
  // Если произошло переполнение, исправляем
  if (result.getMonth() !== expectedMonth) {
    result.setDate(0); 
  }
  return result;
}


export default function CalendarPagination() {
  const { t, i18n } = useTranslation();
const dispatch = useDispatch();
  const waterMonthData = useSelector(selectMonthWaterItems);
  const waterSelectDate = useSelector(selectDate);
   const userData = useSelector(selectUser);
  //  const isLoadingTracker = useSelector(selectLoadingTracker);
  const currentMonth = new Date().toISOString().substring(0, 7)
  const waterDailyNorm = userData.dailyNorm;
 
   const [ queryMonth, setQueryMonth ] = useState( new Date());

   const handleClickRight = () => {
    setQueryMonth(addMonths(queryMonth,1))
  };

   const handleClickLeft = () => {
     setQueryMonth(addMonths(queryMonth,-1))
  };
  
 
const options = {
  month: 'long',
  year: 'numeric'
};

  let strMonth = queryMonth.toLocaleString(i18n.language, options);
  let calendarMonth = queryMonth.toISOString().substring(0, 7);
  
  useEffect(() => {
     
     const fetchWaterData = async () => {
       await Promise.all([
         dispatch(getMonthWaterByMonth(calendarMonth)),
       ]);
     };

     fetchWaterData();
   }, [dispatch, calendarMonth, waterDailyNorm,waterSelectDate]);

let isDisabled = currentMonth === calendarMonth ?  true :  false;
 
  return (
    <div className={css.containerpagin}>
      <div className={css.mainbox}>
        <p className={css.name}>{t("month")}</p>
        <div className={css.mainboxpagination}>
          <div className={css.boxpagination}>
            <button className={css.iconstep} onClick={handleClickLeft}>
              <FiChevronLeft className={css.arrowIcon} />
            </button>
            <p className={css.namemonth}> {strMonth} </p>

            <button className={ css.iconstep } onClick={handleClickRight}
            disabled={isDisabled} >
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
      />
    </div>
  );
}

