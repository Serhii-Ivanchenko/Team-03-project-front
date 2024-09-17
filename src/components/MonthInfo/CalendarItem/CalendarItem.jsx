import css from "./CalendarItem.module.css";

export default function CalendarItem({ day, value }) {
  
  const valpercent = Math.round(value / 1500 * 100);
  const valday = parseInt(day);
  let isColor = valpercent < 100 
  
    let isActiveday = valday === new Date().getDate();
  return (
    <li className={css.item}>
      
      <div className={css.infoday}>
{isActiveday && <button className={css.colordarkgrey}  >
          {valday}
        </button>}
{!isColor && !isActiveday && <button className={css.colorwhite}  >
          {valday}
        </button>}
{isColor && !isActiveday && <button className={css.colorgrey}  >
          {valday}
        </button>}
       <p className={css.percent}>
          {valpercent}%
        </p>
      </div>
      
    </li>
  );
};

