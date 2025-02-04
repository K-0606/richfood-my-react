import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantImageCarousel from "./RestaurantImageCarousel";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import FloatingButtons from "../../components/common/FloatingButtons";
import MapComponent from "../../components/common/MapComponent";
import ReviewSection from "../StorePage/ReviewSection";

const RestaurantDetail = () => {
  const { id } = useParams(); // 從URL中獲取餐廳的ID
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true); // 開始載入
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurant(data);  // 將獲取到的餐廳資料設置到狀態中
      } catch (err) {
        setError(err.message);  // 錯誤處理
      } finally {
        setLoading(false); // 載入完成
      }
    };

    fetchRestaurant();
  }, [id]);  // 依賴 id，當 id 變化時重新發送請求

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurant) return <div>No restaurant data found!</div>;

  return (
    <>
      <Header />
      <div className="restaurant-detail-container" style={styles.container}>
        <div className="restaurant-detail-content" style={styles.content}>
          {/* 左半邊輪播圖 */}
          <RestaurantImageCarousel images={[restaurant.image]} />

          {/* 右半邊餐廳資訊 */}
          <RestaurantInfo restaurant={restaurant} />
        </div>
      </div>
      <MapComponent longitude={restaurant.longitude} latitude={restaurant.latitude} />
      <ReviewSection restaurantId={restaurant.restaurantId} />
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
