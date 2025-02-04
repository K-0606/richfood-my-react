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
  const { id } = useParams(); // 從 URL 中獲取餐廳ID
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 用於觸發 ReviewSection 再次抓取評論的 state
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("獲取到的餐廳數據：", data);
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  // 讓子元件呼叫的 callback：一旦評論提交成功，就翻轉 refreshTrigger
  const handleReviewSubmitted = () => {
    setRefreshTrigger((prev) => !prev);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurant) return <div>No restaurant data found!</div>;

  return (
    <>
      <Header />
      <div className="restaurant-detail-container" style={styles.container}>
        <div className="restaurant-detail-content" style={styles.content}>
          {/* 左邊輪播圖 */}
          <RestaurantImageCarousel images={[restaurant.image]} />

          {/* 右邊餐廳資訊：把 onReviewSubmitted 傳給子元件 */}
          <RestaurantInfo 
            restaurant={restaurant} 
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
      </div>
      <MapComponent longitude={restaurant.longitude} latitude={restaurant.latitude} />

      {/* 評論列表：依賴 refreshTrigger 重新 fetch */}
      <ReviewSection 
        restaurantId={restaurant.restaurantId} 
        refreshTrigger={refreshTrigger}
      />

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
