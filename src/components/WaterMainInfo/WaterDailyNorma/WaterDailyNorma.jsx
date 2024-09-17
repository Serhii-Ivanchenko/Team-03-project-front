import css from './WaterDailyNorma.module.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/selectors';
// import { useSelector } from 'react-redux';

export default function WaterDailyNorma() {
    const user = useSelector(selectUser)

    return (
        <div className={css.normabox}>
            
        <p key={user.id} className={css.normaAmount}>{user.dailyNorm} L</p>
        
            <p className={css.normaText}>My daily norma</p>
        </div>
    );
}