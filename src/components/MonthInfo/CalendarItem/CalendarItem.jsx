import css from "./CalendarItem.module.css";

export default function CalendarItem({ day, value, waterDailyNorm , isActiveDay }) {
  
  const valpercent = Math.round(value / waterDailyNorm * 100);
  const valday = parseInt(day);
  let isColor = valpercent < 100 
  
    // let isActiveday = valday === new Date().getDate();
  return (
    <li className={css.item}>
      
      <div className={css.infoday}>
{isActiveDay && <button className={css.colordarkgrey}  >
          {valday}
        </button>}
{!isColor && !isActiveDay && <button className={css.colorwhite}  >
          {valday}
        </button>}
{isColor && !isActiveDay && <button className={css.colorgrey}  >
          {valday}
        </button>}
       <p className={css.percent}>
          {valpercent}%
        </p>
      </div>
      
    </li>
  );
};

