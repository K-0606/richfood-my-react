import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => {
  return (
    <div>
      <div style={styles.listContainer}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  listContainer: {
    display: 'block',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20px',
  },
};

export default RestaurantList;
