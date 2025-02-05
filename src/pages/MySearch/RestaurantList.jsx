import React, { useState } from "react";
import axios from "axios";
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

  // 點擊事件處理函數
  const handleRestaurantClick = async (restaurantId) => {
    try {
      const response = await fetch("http://localhost:8080/history/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId }),
      });
      if (!response.ok) {
        throw new Error("紀錄歷史API失敗");
      }
      const data = await response.text();
      console.log("後端回應：", data);
    } catch (error) {
      console.error("呼叫後端 API 發生錯誤：", error);
    }
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
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
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