import AddWaterButton from "./AddWaterBtn/AddWaterBtn";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import css from './WaterMainInfo.module.css'
import myIcon from '../../assets/images/icons/icons.svg'

export default function WaterMainInfo() {
    return <div className={css.mainbox}>
        <svg className={css.logoicon} width={114} height={20}>
            <use className={css.logoiconUse}  href={`${myIcon}#icon-AquaTrack`}></use>
        </svg>
        <WaterDailyNorma />
        <WaterProgressBar/>
        <AddWaterButton/>
    </div>
}