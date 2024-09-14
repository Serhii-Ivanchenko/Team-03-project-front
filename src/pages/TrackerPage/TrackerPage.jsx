import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import styles from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <div className={styles.container}>
      <WaterDetailedInfo />
    </div>
  );
}