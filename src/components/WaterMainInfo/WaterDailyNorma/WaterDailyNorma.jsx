import css from './WaterDailyNorma.module.css'

export default function WaterDailyNorma({norma}) {
    return (
        <div className={css.normabox}>
            <p className={css.normaAmount}>{norma} L</p>
            <p className={css.normaText}>My daily norma</p>
        </div>
    );
}