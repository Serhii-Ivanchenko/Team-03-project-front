import css from './AddWaterBtn.module.css'
export default function AddWaterButton() {
    return <div className={css.btnbox}>
        <svg className={css.btnicon} width={16} height={16}>
            <use href='../../../assets/images/icons/icons.svg#icon-edit-2'></use>
        </svg>
        <p className={css.btntext}>Add water</p>
    </div>
} 