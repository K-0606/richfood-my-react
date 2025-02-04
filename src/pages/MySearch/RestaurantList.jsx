import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const RestaurantList = ({ restaurants }) => {
  const itemsPerPage = 3;
  const totalItems = restaurants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // 計算當前頁應顯示的餐廳
  const indexOfLastRestaurant = currentPage * itemsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - itemsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div style={styles.listContainer}>
        {currentRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.restaurantId}
            restaurant={restaurant}
          />
        ))}
      </div>
      {/* 分頁控制 */}
      <Box sx={styles.pagination}>
        <Pagination
          count={totalPages} // 顯示總頁數
          page={currentPage} // 當前頁數
          onChange={handlePageChange} // 當頁數改變時更新
          shape="rounded"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        />
      </Box>
    </div>
  );
};

const styles = {
  listContainer: {
    display: "block",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px",
  },
  pagination: {
    textAlign: "center",
    marginTop: "20px",
  },
};

export default RestaurantList;
