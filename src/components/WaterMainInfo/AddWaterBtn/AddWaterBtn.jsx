import css from './AddWaterBtn.module.css'
import myIcon from '../../../assets/images/icons/icons.svg'

export default function AddWaterButton() {
    return <button type='button' className={css.btnbox}>
        <svg className={css.btnicon} width={16} height={16}>
            <use className={css.btniconUse} href={`${myIcon}#icon-plus`}></use>
        </svg>
        <p className={css.btntext}>Add water</p>
    </button>
} 