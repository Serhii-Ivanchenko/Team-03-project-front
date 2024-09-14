import AddWaterButton from '../AddWaterButton/AddWaterButton';
import ChooseDate from '../ChooseDate/ChooseDate';
import WaterList from '../WaterList/WaterList';
import styles from "./DailyInfo.module.css";

const DailyInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <ChooseDate />
        <AddWaterButton />
      </div>
      <WaterList className={styles.waterList} />
    </div>
  );
};

export default DailyInfo;
