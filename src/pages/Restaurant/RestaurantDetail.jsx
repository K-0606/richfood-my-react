import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockRestaurants } from "../MySearch/mockData"; // 模擬資料
import RestaurantInfo from "./RestaurantInfo";
import RestaurantImageCarousel from "./RestaurantImageCarousel";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import FloatingButtons from "../../components/common/FloatingButtons";
import MyRecommend from "../MyRecommend";
import MapComponent from "../../components/common/MapComponent";
import ReviewSection from "../StorePage/ReviewSection";

const RestaurantDetail = () => {
  const { id } = useParams(); // 從URL中獲取餐廳的ID
  const [restaurant, setRestaurant] = useState(null);

  // 假設這裡用mockData來模擬資料，如果是後端資料庫則發送API請求
  useEffect(() => {
    const fetchRestaurant = () => {
      const selectedRestaurant = mockRestaurants.find(
        (restaurant) => restaurant.id === parseInt(id)
      );
      setRestaurant(selectedRestaurant);
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="restaurant-detail-container" style={styles.container}>
        <div className="restaurant-detail-content" style={styles.content}>
          {/* 左半邊輪播圖 */}
          <RestaurantImageCarousel images={restaurant.images} />

          {/* 右半邊餐廳資訊 */}
          <RestaurantInfo restaurant={restaurant} />
        </div>
      </div>
      <MapComponent />
      <ReviewSection />
      <FloatingButtons />
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  content: {
    display: "flex",
    width: "80%",
    gap: "20px",
  },
};

export default RestaurantDetail;
