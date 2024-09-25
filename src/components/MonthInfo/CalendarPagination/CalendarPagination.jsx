import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMonthWaterByMonth } from "../../../redux/water/operations.js";
import {
  selectMonthWaterItems,
  selectDate,
  selectTotalValue,
} from "../../../redux/water/selectors.js";
import { selectUser } from "../../../redux/user/selectors.js";
import css from "./CalendarPagination.module.css";
import myIcon from "../../../assets/images/icons/icons.svg";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Statistics from "../Statistics/Statistics.jsx";
import { useState } from "react";
import Calendar from "../Calendar/Calendar.jsx";

function addMonths(date, months) {
  let result = new Date(date);
  let expectedMonth = (((result.getMonth() + months) % 12) + 12) % 12;
  result.setMonth(result.getMonth() + months);

  // Если произошло переполнение, исправляем
  if (result.getMonth() !== expectedMonth) {
    result.setDate(0);
  }
  return result;
}

export default function CalendarPagination() {
  const dispatch = useDispatch();
  const waterMonthData = useSelector(selectMonthWaterItems);
  const waterSelectDate = useSelector(selectDate);
  const userData = useSelector(selectUser);
  const totalByDate = useSelector(selectTotalValue);
  const currentMonth = new Date().toISOString().substring(0, 7);
  const currentDay = new Date().getDate();
  const waterDailyNorm = userData.dailyNorm * 1000;

  const [queryMonth, setQueryMonth] = useState(new Date());
  const [isCalendar, setIsCalendar] = useState(true);

  const handleClickRight = () => {
    setQueryMonth(addMonths(queryMonth, 1));
  };

  const handleClickLeft = () => {
    setQueryMonth(addMonths(queryMonth, -1));
  };

  const handleToggleCalendar = () => {
    setIsCalendar(!isCalendar);
  };

  const options = {
    month: "long",
    year: "numeric",
  };

  let strMonth = queryMonth.toLocaleString("en-US", options);
  let calendarMonth = queryMonth.toISOString().substring(0, 7);
  let actualDateTotal = waterSelectDate + String(totalByDate);

  useEffect(() => {
    const fetchWaterData = async () => {
      await Promise.all([dispatch(getMonthWaterByMonth(calendarMonth))]);
    };

    fetchWaterData();
  }, [dispatch, calendarMonth, waterDailyNorm, actualDateTotal]);

  let isCurrentMonth = currentMonth === calendarMonth ? true : false;

  let endDay = isCurrentMonth && currentDay > 7 ? currentDay - 1 : 6;
  let startDay = isCurrentMonth && currentDay > 7 ? currentDay - 6 : 0;

  let statisticMonthData = waterMonthData.map((el) => ({
    ...el,
    day: el.date.substring(8, 10).replace(/^0+/, ""),
  }));

  return (
    <div className={css.containerpagin}>
      <div className={css.mainbox}>
        <p className={css.name}>{isCalendar ? "Month" : "Statistics"}</p>
        <div className={css.mainboxpagination}>
          <div className={css.boxpagination}>
            <button className={css.iconstep} onClick={handleClickLeft}>
              <FiChevronLeft className={css.arrowIcon} />
            </button>
            <p className={css.namemonth}> {strMonth} </p>

            <button
              className={css.iconstep}
              onClick={handleClickRight}
              disabled={isCurrentMonth}
              style={{ cursor: "default" }}
            >
              <FiChevronRight className={css.arrowIcon} />
            </button>
          </div>

          <button className={css.pieIconWrapper} onClick={handleToggleCalendar}>
            <svg className={css.iconpie}>
              <use href={`${myIcon}#icon-pie-chart-02`}></use>
            </svg>
          </button>
        </div>
      </div>
      {isCalendar && (
        <Calendar
          monthData={waterMonthData}
          waterDailyNorm={waterDailyNorm}
          waterSelectDate={waterSelectDate}
        />
      )}
      {!isCalendar && (
        <Statistics
          monthData={statisticMonthData}
          startDay={startDay}
          endDay={endDay}
        />
      )}
    </div>
  );
}
