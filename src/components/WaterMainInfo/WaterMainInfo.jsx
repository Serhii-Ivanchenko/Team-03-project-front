import AddWaterButton from "./AddWaterBtn/AddWaterBtn";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import css from './WaterMainInfo.module.css'

export default function WaterMainInfo() {
    return <div className={css.mainbox}>
        <WaterDailyNorma />
        <WaterProgressBar/>
        <AddWaterButton/>
    </div>
}