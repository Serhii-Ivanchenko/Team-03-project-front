import { useDispatch } from "react-redux";
import css from "./CalendarItem.module.css";
import { changeActualDate } from '../../../redux/water/slice.js';

export default function CalendarItem({date, day, value, waterDailyNorm , isActiveDay }) {
  const dispatch = useDispatch();
  const valpercent = Math.round(value / waterDailyNorm * 100);
  const valday = parseInt(day);
  let isColor = valpercent < 100;
  let isNotClick = new Date().toISOString().substring(0, 10) < date ?  true :  false;
 
  return (
    <li className={css.item}>
      
      <div className={css.infoday}>
        {isActiveDay && <button className={css.colordarkgrey} onClick={() => dispatch(changeActualDate(date))}>
          {valday}
        </button>}
         { !isActiveDay && isNotClick && <button className={isColor? css.colorgrey : css.colorwhite }  >
          {valday}
        </button>}
        { !isActiveDay && !isNotClick && <button className={isColor? css.colorgrey : css.colorwhite } onClick={() => dispatch(changeActualDate(date))} >
          {valday}
        </button>}
     
       <p className={css.percent}>
          {valpercent}%
        </p>
      </div>
      
    </li>
  );
};

