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

  // 新增的點擊事件處理函數
  const handleRestaurantClick = (restaurantId) => {
    // 當餐廳被點擊時
    console.log(`餐廳 ID: ${restaurantId} 被點擊了！`);
    // 這裡可以加入 API 呼叫，將點擊的餐廳ID傳送到後端，增加點擊計數
    // 比如：
    // fetch('/api/restaurant/click', {
    //   method: 'POST',
    //   body: JSON.stringify({ restaurantId }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  };

  return (
    <div>
      <div style={styles.listContainer}>
        {currentRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.restaurantId}
            restaurant={restaurant}
            onClick={handleRestaurantClick} // 傳遞點擊處理函數
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
