import { useDispatch, useSelector } from "react-redux";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import styles from "./TrackerPage.module.css";
import { useEffect } from "react";
import {
  getDayWaterByDate,
  getMonthWaterByMonth,
} from "../../redux/water/operations.js";
import Loader from "../../components/Loader/Loader.jsx";
import { getUserData } from "../../redux/user/operations.js";
import {
  selectLoadingTracker,
} from "../../redux/user/selectors.js";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const isLoadingTracker = useSelector(selectLoadingTracker);

  const date = new Date();
  const month = date.toISOString().substring(0, 7);
  const today = date.toISOString().substring(0, 10);

  useEffect(() => {
    const fetchWaterData = async () => {
      await Promise.all([
        dispatch(getUserData()),
        dispatch(getDayWaterByDate(today)),
        dispatch(getMonthWaterByMonth(month)),
      ]);
    };

    fetchWaterData();
  }, [dispatch, today]);

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
