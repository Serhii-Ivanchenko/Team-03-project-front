import  { useRef, useEffect } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import styles from './WaterList.module.css';

const WaterList = () => {
  const containerRef = useRef(null);

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

  // Тимчасовий масив даних для прикладу
  const waterItems = [
    { id: 1, quantity: '250 ml', time: '08:00' },
    { id: 2, quantity: '300 ml', time: '12:00' },
    { id: 3, quantity: '500 ml', time: '03:00' },
    { id: 4, quantity: '200 ml', time: '07:00' },
  ];

  return (
    <div className={styles.containerWrapper}>
      <div
        ref={containerRef}
        className={styles.container}
      >
        {waterItems.map(item => (
          <WaterItem key={item.id} quantity={item.quantity} time={item.time} />
        ))}
      </div>
    </div>
  );
};

export default WaterList;
