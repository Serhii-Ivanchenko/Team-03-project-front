import css from "../WelcomeSection/WelcomeSection.css"
import Logo from "../Logo/Logo.jsx";


const WelcomeSection = () => {

  return (
      <div className={css.main}>
          <Logo/>
      <p className={css.description}>Record daily water intake and track</p>
      <h1 className={css.title}>Water consumption tracker</h1>
    </div>
  );
}

export default WelcomeSection