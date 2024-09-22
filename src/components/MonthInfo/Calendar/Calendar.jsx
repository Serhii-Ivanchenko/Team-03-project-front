import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem.jsx'

export default function Calendar({ monthData, waterDailyNorm , waterSelectDate, onCalendarClick }) {
  //  console.log(monthData);
  // Тимчасовий масив даних для прикладу
    // const data = [
    //     { date: "2024-09-01", value: 685 },
    //     { date: "2024-09-02", value: 0 },
    //     { date: "2024-09-03", value: 0 },
    //     { date: "2024-09-04", value: 0 },
    //     { date: "2024-09-05", value: 0 },
    //     { date: "2024-09-06", value: 0 },
    //     { date: "2024-09-07", value: 0 },
    //     { date: "2024-09-08", value: 0 },
    //     { date: "2024-09-09", value: 0},
    //     { date: "2024-09-10", value: 0 },
    //     { date: "2024-09-11", value: 1110},
    //     {date: "2024-09-12",value: 2775},
    //     { date: "2024-09-13",value: 260},
    //     { date: "2024-09-14", value: 0},
    //     { date: "2024-09-15", value: 0},
    //     { date: "2024-09-16", value: 0},
    //     { date: "2024-09-17", value: 0},
    //     { date: "2024-09-18", value: 0},
    //     { date: "2024-09-19", value: 0},
    //     { date: "2024-09-20", value: 0},
    //     { date: "2024-09-21", value: 0},
    //     { date: "2024-09-22", value: 0},
    //     { date: "2024-09-23", value: 0},
    //     { date: "2024-09-24", value: 0},
    //     { date: "2024-09-25", value: 0},
    //     { date: "2024-09-26", value: 0},
    //     { date: "2024-09-27", value: 0},
    //     { date: "2024-09-28", value: 0},
    //     { date: "2024-09-29", value: 0},
    //     { date: "2024-09-30", value: 0}
    // ];


  return (
    <div className={css.containercalend}>
     { monthData.map(item => (
       <CalendarItem key={item.date} day={item.date.slice(-2)} value={item.value}
        waterDailyNorm ={waterDailyNorm} isActiveDay={item.date ===waterSelectDate ? true:false } 
         onClick={onCalendarClick} />
      ))}
    </div>
  );
};


