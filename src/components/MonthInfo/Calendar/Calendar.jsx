import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem.jsx'


export default function Calendar({ monthData, waterDailyNorm, waterSelectDate }) {


  return (
    <div className={css.containercalend}>
     { monthData.map(item => (
       <CalendarItem key={item.date} date={item.date} day={item.date.slice(-2)} value={item.value}
        waterDailyNorm ={waterDailyNorm} isActiveDay={item.date ===waterSelectDate ? true:false } 
         />
      ))}
    </div>
  );
};


