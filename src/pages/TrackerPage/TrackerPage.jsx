import { useDispatch, useSelector } from "react-redux";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import styles from "./TrackerPage.module.css";
import { useEffect } from "react";
import {
  getDayWaterByDate,
  // getMonthWaterByMonth,
} from "../../redux/water/operations.js";
import {
  selectDayWaterItems,
  selectLoading,
} from "../../redux/water/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";
import { getUserData } from "../../redux/user/operations.js";
import {
  selectLoadingTracker,
  selectLoadingUser,
} from "../../redux/user/selectors.js";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const waterData = useSelector(selectDayWaterItems);
  const isLoading = useSelector(selectLoading);
  const isLoadingUserData = useSelector(selectLoadingUser);
  const isLoadingTracker = useSelector(selectLoadingTracker);

  const date = new Date(Date.now());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  useEffect(() => {
    const fetchWaterData = async () => {
      await Promise.all([
        dispatch(getUserData()),
        dispatch(getDayWaterByDate("2024-09-12")),
        // dispatch(getMonthWaterByMonth("2024-08")),
      ]);
    };

    fetchWaterData();
  }, [dispatch, today]);

  console.log("waterData", waterData);

  // const loading = isLoading || isLoadingUserData || isLoadingTracker;

  return isLoadingTracker ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
