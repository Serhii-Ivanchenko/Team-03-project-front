import  { useRef, useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import styles from './WaterList.module.css';
import { useSelector } from 'react-redux';
import {selectDayWaterItems} from '../../redux/water/selectors';
import { useTranslation } from 'react-i18next';

const WaterList = () => {
  const { t } = useTranslation();
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

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className={styles.containerWrapper}>
      <div ref={containerRef} className={styles.container}>
        {waterItems.length > 0 ? (
          waterItems.map((item) => (
            <WaterItem key={item.id} value={item.value} time={item.time} />
          ))
        ) : (
          <p className={styles.message}>{t("no_records")}</p>
        )}
      </div>
    </div>
  );
};

export default WaterList;
