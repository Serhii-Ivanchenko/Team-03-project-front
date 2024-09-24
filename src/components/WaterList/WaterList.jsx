import { useRef, useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import styles from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { selectDayWaterItems } from "../../redux/water/selectors";

const WaterList = () => {
  const containerRef = useRef(null);
  const waterItems = useSelector(selectDayWaterItems);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (event) => {
      if (container) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Функція для перетворення часу у формат, який можна сортувати
  const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Сортуємо waterItems за часом
  const sortedWaterItems = [...waterItems].sort((a, b) => {
    return convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time);
  });

  return (
    <div className={styles.containerWrapper}>
      <ul ref={containerRef} className={styles.container}>
        {sortedWaterItems.length > 0 ? (
          sortedWaterItems.map((item) => (
            <WaterItem key={item.id} itemId={item.id} value={item.value} time={item.time} />
          ))
        ) : (
          <p className={styles.message}>No records about water consumption</p>
        )}
      </ul>
    </div>
  );
};

export default WaterList;
