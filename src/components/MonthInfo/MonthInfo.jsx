import css from './MonthInfo.module.css';
import CalendarPagination from './CalendarPagination/CalendarPagination.jsx';



export default function MonthInfo() {

    

 
   
    return (
        <div className={css.container}>
        {/* <div className={css.mainbox}> */}
            {/* <div className={css.name}>Month</div> */}           
                <CalendarPagination  />

            {/* </div > */}
            

        </div>
  )
}

