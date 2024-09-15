import css from "./AdvantagesSection.module.css";


const AdvantagesSection = () => {
  return (
    <div className={css.img}>
      <div className={css.infoStaticsBtn}>
        <button className={css.habitbtn}><span className={css.circle}></span> Habit drive</button>
        <button className={css.statistics}>View statistics</button>
      </div>
      <div className={css.ratebtn}>
        <button className={css.rate}>Personal rate setting</button>
      </div>
    </div>
  );
}

export default AdvantagesSection