import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 顯示餐廳第一張圖片 */}
      <img 
        src={restaurant.images[0]}  
        alt={restaurant.name} 
        style={styles.image} 
      />
      
      <div style={styles.cardContent}>
        <h3 style={styles.restaurantName}>
            <Link to={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                {restaurant.name}
            </Link>
         </h3>
        <p style={styles.type}>類型: {restaurant.type}</p>
        <p style={styles.region}>地區: {restaurant.region}</p>
        <p style={styles.rating}>評分: {'⭐'.repeat(restaurant.rating)}{'☆'.repeat(5 - restaurant.rating)}</p>
        <p style={styles.price}>平均消費: ${restaurant.price}</p>
        <p style={styles.address}>地址: {restaurant.address}</p>
        <p style={styles.review}>評語: {restaurant.review}</p>
      </div>
    </div>
  );
};

// 增加樣式
const styles = {
  card: {
    display: 'block', // 確保每個卡片獨立顯示
    width: '100%', // 佔據整個寬度，單個卡片顯示
    marginBottom: '20px', // 卡片底部間距
    padding: '20px', // 內邊距
    borderRadius: '10px', // 圓角
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 輕微陰影
    backgroundColor: '#fff', // 背景顏色
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // 增加過渡效果
  },
  cardHover: {
    transform: 'scale(1.05)', // 懸停時放大
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // 更強的陰影效果
  },
  image: {
    width: '150px', // 圖片寬度
    height: '150px', // 圖片高度
    objectFit: 'cover', // 保持圖片比例，填滿區域
    borderRadius: '8px', // 圓角圖片
    marginRight: '20px', // 右側間距
  },
  cardContent: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: 'calc(100% - 170px)', // 調整內容區域寬度
  },
  restaurantName: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  type: {
    fontSize: '1.1em',
    color: '#7f8c8d', // 顏色為灰色
    marginBottom: '8px',
  },
  region: {
    fontSize: '1.1em',
    color: '#7f8c8d',
    marginBottom: '8px',
  },
  rating: {
    fontSize: '1.1em',
    color: '#f39c12', // 黃色評分
    marginBottom: '8px',
  },
  price: {
    fontSize: '1.1em',
    color: '#2ecc71', // 綠色顯示價格
    marginBottom: '8px',
  },
  address: {
    fontSize: '1em',
    color: '#7f8c8d', // 灰色地址
    marginBottom: '8px',
  },
  review: {
    fontSize: '1em',
    color: '#7f8c8d',
  },
};

export default RestaurantCard;
