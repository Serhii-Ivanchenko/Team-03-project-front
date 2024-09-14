import css from "../Logo/Logo.css"

const Logo = () => {
  return (
    <div>
      <svg className={css.logo} width={152} height={24}>
        <use href="./../../../assets/images/icons.svg#icon-AquaTrack"></use>
      </svg>
    </div>
  );
}

export default Logo