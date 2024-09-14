import WaterItem from '../WaterItem/WaterItem';
import styles from './WaterList.module.css';


const WaterList = () => {
  // Тимчасовий масив даних для прикладу
  const waterItems = [
    { id: 1, quantity: '250 ml', time: '08:00 AM' },
    { id: 2, quantity: '300 ml', time: '12:00 PM' },
    { id: 3, quantity: '500 ml', time: '03:00 PM' },
    { id: 4, quantity: '200 ml', time: '07:00 PM' },
  ];

  return (
    <div className={styles.container}>
      {waterItems.map(item => (
        <WaterItem key={item.id} quantity={item.quantity} time={item.time} />
      ))}
    </div>
  );
};

export default WaterList;