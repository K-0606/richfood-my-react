import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantImageCarousel from "./RestaurantImageCarousel";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import FloatingButtons from "../../components/common/FloatingButtons";
import MapComponent from "../../components/common/MapComponent";
import ReviewSection from "../StorePage/ReviewSection";
import CouponCard from "./CouponCard";

const RestaurantDetail = () => {
  const { id } = useParams(); // 從 URL 中獲取餐廳ID
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 用於觸發 ReviewSection 再次抓取評論的 state
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const [coupons, setCoupons] = useState([]); // 新增一個 state 來儲存 coupons

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const storeId = data.storeId;

        // 嘗試獲取餐券資料
        const couponResponse = await fetch(`http://localhost:8080/coupons/selectCoupon?storeId=${storeId}`);
        if (!couponResponse.ok) {
          // 如果 coupon API 有錯誤，則跳過
          setCoupons([]); // 設置空的 coupons
        } else {
          const couponData = await couponResponse.json();
          setCoupons(couponData); // 正確的話就設置 coupons
        }

        // 將餐廳資料設置進 state
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

      {/* 餐券展示區域 - 只有在有 coupon 資料時才顯示 */}
      {coupons.length > 0 && (
        <div style={styles.couponSection}>
          {coupons.map((coupon) => (
            <CouponCard key={coupon.couponId} coupon={coupon} restaurantId={restaurant.id} />
          ))}
        </div>
      )}

      <MapComponent longitude={restaurant.longitude} latitude={restaurant.latitude} />
      {/* 評論列表 */}
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
  couponSection: {
    display: "flex",
    flexDirection: "column", // 改為垂直排列
    alignItems: "flex-end", // 居中顯示
    marginTop: "20px",
    marginRight: "150px",
    padding: "0 10px", // 一些內邊距以免餐券過於擁擠
  },
};

export default RestaurantDetail;
