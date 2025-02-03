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
      <img 
        src={restaurant.image}  
        alt={restaurant.name} 
        style={styles.image} 
      />
      
      <div style={styles.cardContent}>
        <h3 style={styles.restaurantName}>
            <Link to={`/restaurant/${restaurant.restaurantId}`} style={{ textDecoration: 'none', color: 'black' }}>
                {restaurant.name}
            </Link>
        </h3>
        <p style={styles.type}>類型: {restaurant.categories.map((cat) => cat.name).join(', ')}</p>
        <p style={styles.region}>地區: {restaurant.country} {restaurant.district}</p>
        <p style={styles.rating}>評分: {'⭐'.repeat(restaurant.score)}{'☆'.repeat(5 - restaurant.score)}</p>
        <p style={styles.price}>平均消費: ${restaurant.average}</p>
        <p style={styles.address}>地址: {restaurant.address}</p>
        <p style={styles.review}>電話: {restaurant.phone}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'block',
    width: '100%',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '20px',
  },
  cardContent: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: 'calc(100% - 170px)',
  },
  restaurantName: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  type: {
    fontSize: '1.1em',
    color: '#7f8c8d',
    marginBottom: '8px',
  },
  region: {
    fontSize: '1.1em',
    color: '#7f8c8d',
    marginBottom: '8px',
  },
  rating: {
    fontSize: '1.1em',
    color: '#f39c12',
    marginBottom: '8px',
  },
  price: {
    fontSize: '1.1em',
    color: '#2ecc71',
    marginBottom: '8px',
  },
  address: {
    fontSize: '1em',
    color: '#7f8c8d',
    marginBottom: '8px',
  },
  review: {
    fontSize: '1em',
    color: '#7f8c8d',
  },
};

export default RestaurantCard;