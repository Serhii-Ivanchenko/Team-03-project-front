import DailyInfo from "../DailyInfo/DailyInfo"
import UserPanel from "../UserPanel/UserPanel"
import styles from "./WaterDetailedInfo.module.css"

const WaterDetailedInfo = () => {
    return (
        <div className={styles.container}>
            <UserPanel />
            <DailyInfo />
        </div>
    )
}

export default WaterDetailedInfo;