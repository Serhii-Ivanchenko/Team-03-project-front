import css from "./WaterProgressBar.module.css";
import { useSelector } from "react-redux";
import { selectTotalValue } from "../../../redux/water/selectors";
import { getDayWaterByDate } from "../../../redux/water/operations";
import { useDispatch } from "react-redux";
import { selectUser } from "../../../redux/user/selectors";
import { useEffect } from "react";
import { selectDate } from "../../../redux/water/selectors";

export default function WaterProgressBar() {
  const dayValue = useSelector(selectTotalValue);
  const user = useSelector(selectUser);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();

  const dailyNorma = user.dailyNorm * 1000;
  const totalValue = dayValue;
  const progress = Math.min(Math.round((totalValue / dailyNorma) * 100), 100);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long' };
  return `${date.toLocaleDateString('en-US', options).replace(/\s/, ', ')}`;
 };

  const dateData = () => {
    const today = new Date().toISOString().split("T")[0];
    
    const selectedDate =
      typeof date === "string"
        ? date
        : new Date(date).toISOString().split("T")[0];

    return selectedDate === today ? "Today" : formatDate(selectedDate);
  };

  useEffect(() => {
    if (date) {
      const day = new Date(date).toISOString().split("T")[0];
      dispatch(getDayWaterByDate(day));
    }
  }, [dispatch, date]);

  return (
    <div className={css.barbox}>
      <p className={css.barday}>{dateData(date)}</p>
      <div className={css.barline}>
        <div
          className={css.barlineFill}
          style={
            progress <= 97
              ? { width: `calc(${progress}% + 5px)` }
              : { width: `calc(${progress}%)` }
          }
        ></div>
        <div
          className={css.barcircle}
          style={
            progress >= 98
              ? { left: `${progress - 4}%` }
              : { left: `${progress}%` }
          }
        ></div>
      </div>

      <div className={css.wrapper}>
        <div className={css.listItem} style={{ left: `${progress}%` }}>
          <div
            className={`${css.percent} ${
              (progress >= 0 && progress < 5) ||
              (progress >= 40 && progress < 60) ||
              progress >= 82
                ? css.hidePercent
                : ""
            }`}
          >
            {progress}%
          </div>
        </div>
      </div>

      <ul className={css.barpercent}>
        <li className={css.percent0} style={{ left: "0%" }}>
          <p>0%</p>
        </li>
        <li className={css.percent50} style={{ left: "50%" }}>
          <p>50%</p>
        </li>
        <li style={{ left: "100%" }}>
          <p>100%</p>
        </li>
      </ul>
    </div>
  );
}
