import css from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import { selectDayWaterItems } from '../../../redux/water/selectors';
import { getDayWater } from '../../../redux/water/operations';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../../redux/user/selectors';
import { useEffect } from 'react';

export default function WaterProgressBar() {
    const dayValue = useSelector(selectDayWaterItems);
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const dailyNorma = user.dailyNorm
    const dayVal = dayValue.totalValue
    const progress = Math.round((dayVal / dailyNorma) * 100, 100)
    // const progress = 50
    
    useEffect(() => {
        dispatch(getDayWater())
    }, [dispatch])
    


    return (
        <div className={css.barbox}>
            <p className={css.barday}>Today</p>
            <div className={css.barline}>
                <div className={css.barlineFill}  style={{ width: `${progress}%` }}></div>
                <div  className={css.barcircle} style={{ left: `calc(${progress}% - 10px)` }}></div>
            </div>
                <ul className={css.barpercent}>
                <li className={css.listItem} style={{ left: `calc(${progress}% - 10px)` }}><div className={css.percent} >{progress}%</div>  </li>
                <li><p>0%</p></li>
                <li><p>50%</p></li>
                <li><p>100%</p></li>
                </ul>
            </div>
    );
}