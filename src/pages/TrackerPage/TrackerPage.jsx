import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import styles from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <div className={styles.container}>
      <WaterMainInfo />
      <WaterDetailedInfo />
          </div>
  );
}
