import css from './WaterDailyNorma.module.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/selectors';

export default function WaterDailyNorma() {
    const user = useSelector(selectUser)
    const dailyNorm = user.dailyNorm;

    return (
        <div className={css.normabox}>
            
        <p key={user.id} className={css.normaAmount}>{dailyNorm} L</p>
        
            <p className={css.normaText}>My daily norma</p>
        </div>
    );
}