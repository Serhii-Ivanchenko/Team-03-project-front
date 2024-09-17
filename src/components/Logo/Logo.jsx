import css from "./Logo.module.css";
 import myIcon from "../../assets/images/icons/icons.svg"; 


const Logo = () => {
  return (
    <div className={css.logo}>
      <svg className={css.logo} width={114} height={20}>
        <use className={css.logoicon} href={`${myIcon}#icon-AquaTrack`}></use>
      </svg>
    
     
    </div>
  );
}

export default Logo