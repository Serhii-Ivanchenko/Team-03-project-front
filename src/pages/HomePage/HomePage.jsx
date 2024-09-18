import AdvantagesSection from "../../components/HomePage/AdvantagesSection/AdvantagesSection.jsx";
import WelcomeSection from "../../components/HomePage/WelcomeSection/WelcomeSection.jsx";
import css from "./HomePage.module.css";

import AddWaterModal from "../../components/Modals/AddWaterModal/AddWaterModal";

export default function HomePage() {
  return (
    <div>
      <WelcomeSection classname={css.wel} />
      <AdvantagesSection />
      <AddWaterModal />
    </div>
  );
}
