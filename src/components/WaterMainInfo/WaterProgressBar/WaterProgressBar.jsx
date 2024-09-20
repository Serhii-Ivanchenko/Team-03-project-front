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
    // const progress = 98
    
    useEffect(() => {
        dispatch(getDayWater())
    }, [dispatch])
    


    return (
        <div className={css.barbox}>
            <p className={css.barday}>Today</p>
            <div className={css.barline}>
                <div className={css.barlineFill}  style={{ width: `calc(${progress}% + 10px)` }}></div>
                <div  className={css.barcircle} style={{ left: `${progress}%` }}></div>
            </div>

              <div className={css.wrapper}>
                <div className={css.listItem} style={{ left: `${progress}%` }}>
                    <div className={css.percent} >{progress}%</div>
                </div></div>

            <ul className={css.barpercent}>
                <li className={progress >= 0 && progress < 10 ? css.hide0 : ''} style={{ left: '0%' }}><p>0%</p></li>
                <li  className={progress >= 40 && progress < 60 ? css.hide50 : ''} style={{ left: '50%' }}><p>50%</p></li>
                <li className={progress >= 90 ? css.hide100 : ''} style={{ left: '100%' }}><p>100%</p></li>
                </ul>
            </div>
    );
}

