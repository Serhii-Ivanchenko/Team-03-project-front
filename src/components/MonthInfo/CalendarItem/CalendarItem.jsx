import css from "./CalendarItem.module.css";

export default function CalendarItem({ day, value }) {
  // const cssgrey = 'background-color:rgba(50, 63, 71, 0.2)';
  //  const csswhite = 'css.colorwhite'; `${csswhite}`
  //  const cssdarkgrey = 'background-color: #323f47;';
  
  const valpercent = Math.round(value / 1500 * 100);
  const valday = parseInt(day);
  let isColor = valpercent < 100 
  console.log(isColor)
    //  isColor = day ===  new Date().getDate() ? cssdarkgrey : isColor;
  return (
    <li className={css.item}>
      
      <div className={css.infoday}>

        <button className={css.colorwhite}  >
          {valday}
        </button>

        <p className={css.percent}>
          {valpercent}%
        </p>
      </div>
      
    </li>
  );
};

