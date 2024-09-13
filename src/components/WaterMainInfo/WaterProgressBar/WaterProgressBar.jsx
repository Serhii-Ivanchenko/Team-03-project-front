import css from './WaterProgressBar.module.css';

export default function WaterProgressBar() {
    return <div className={css.barbox}>
        <p className={css.barday}>Today</p>
        <div className={css.barline}></div>
        <ul className={css.barpercent}>
            <li><p>0%</p></li>
            <li><p>50%</p></li>
            <li><p>100%</p></li>
        </ul>
    </div>
}