import DailyInfo from "../DailyInfo/DailyInfo";
import UserPanel from "../UserPanel/UserPanel";
import MonthInfo from "../MonthInfo/MonthInfo";
import styles from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
    return (
        <div className={styles.container}>
            <UserPanel />
            <DailyInfo />
            <MonthInfo />
        </div>
    )
}

export default WaterDetailedInfo;