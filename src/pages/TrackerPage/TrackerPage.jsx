import { useDispatch, useSelector } from "react-redux";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import styles from "./TrackerPage.module.css";
import { useEffect } from "react";
import {
  getDayWaterByDate,
  // getMonthWaterByMonth,
} from "../../redux/water/operations.js";
import Loader from "../../components/Loader/Loader.jsx";
import { getUserData } from "../../redux/user/operations.js";
import {
  selectLoadingTracker,
} from "../../redux/user/selectors.js";
import toast from "react-hot-toast";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const isLoadingTracker = useSelector(selectLoadingTracker);

  const date = new Date();
  const today = date.toISOString().substring(0, 10);

  useEffect(() => {
    const fetchWaterData = async () => {
      await Promise.all([
        dispatch(getUserData())
          .unwrap()
          .then(() => {})
          .catch((err) => {
            toast.error("Ooops, something went wrong. Please try again.");
          }),
        dispatch(getDayWaterByDate(today))
          .unwrap()
          .then(() => {})
          .catch((err) => {
            toast.error("Ooops, can't get water data. Please try again.");
          }),
      ]);
    };

    fetchWaterData();
  }, [dispatch, today]);

  return isLoadingTracker ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
