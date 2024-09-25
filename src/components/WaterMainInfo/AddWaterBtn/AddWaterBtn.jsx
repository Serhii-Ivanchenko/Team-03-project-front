import css from './AddWaterBtn.module.css'
import myIcon from '../../../assets/images/icons/icons.svg'
import { useTranslation } from 'react-i18next';

export default function AddWaterButton({openModal}) {
    const { t } = useTranslation();


    return (
        <button type='button' className={css.btnbox} onClick={openModal}>
            <svg className={css.btnicon} width={16} height={16}>
                <use className={css.btniconUse} href={`${myIcon}#icon-plus`}></use>
            </svg>
            <p className={css.btntext}>{t("add_water")}</p>
        </button>
    );
} 