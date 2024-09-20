import css from './WaterProgressBar.module.css';
// import { useSelector } from 'react-redux';
// import { selectTotalValue } from '../../../redux/water/selectors';
// import { getDayWaterByDate } from '../../../redux/water/operations';
// import { useDispatch } from 'react-redux';
// import { selectUser } from '../../../redux/user/selectors';
// import { useEffect } from 'react';

export default function WaterProgressBar() {
    // const dayValue = useSelector(selectTotalValue);
    // const user = useSelector(selectUser)
    // const dispatch = useDispatch()

    // const dailyNorma = user.dailyNorm
    // const dayVal = dayValue.totalValue
    // const progress = Math.min(Math.round((dayVal / dailyNorma) * 100), 100)
    const progress = Math.min(Math.round(123), 100)
    
    // useEffect(() => {
    //     dispatch(getDayWaterByDate())
    // }, [dispatch])
    


    return (
        <div className={css.barbox}>
            <p className={css.barday}>Today</p>
            <div className={css.barline}>
                <div className={css.barlineFill}  style={{ width: `calc(${progress}% + 10px)` }}></div>
                <div  className={css.barcircle} style={{ left: `${progress}%` }}></div>
            </div>

               <div className={css.wrapper}>
                <div className={css.listItem} style={{ left: `${progress}%` }}>
                    <div className={`${css.percent} ${(progress >= 0 && progress < 5) || (progress >= 40 && progress < 60) || progress >= 82 ? css.hidePercent : ''}`}>{progress}%</div>
                </div>
            </div>
            
            <ul className={css.barpercent}>
                <li ><p>0%</p></li>
                <li  ><p>50%</p></li>
                <li ><p>100%</p></li>
                </ul>
            </div>
    );
}

