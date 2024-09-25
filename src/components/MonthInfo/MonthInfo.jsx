import css from "./MonthInfo.module.css";
import CalendarPagination from "./CalendarPagination/CalendarPagination.jsx";

export default function MonthInfo() {
  return (
    <div className={css.container}>
      <CalendarPagination />
    </div>
  );
}
