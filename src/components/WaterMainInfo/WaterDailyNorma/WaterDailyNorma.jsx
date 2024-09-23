import css from './WaterDailyNorma.module.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/selectors';
import { useTranslation } from 'react-i18next';

export default function WaterDailyNorma() {
    const { t } = useTranslation();
    const user = useSelector(selectUser)
    const dailyNorm = user.dailyNorm / 1000;

    return (
        <div className={css.normabox}>
            
        <p key={user.id} className={css.normaAmount}>{dailyNorm}{t("l")}</p>
        
            <p className={css.normaText}>{t("settings.daily_norm")}</p>
        </div>
    );
}