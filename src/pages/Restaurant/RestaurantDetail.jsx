import React, { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
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

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log("獲取到的餐廳數據：", data);

        const storeId=data.storeId;
        // console.log(  "我要的!!!"+id);
        console.log(  "我要的!!!"+storeId);
        console.log("取得的 storeId:", storeId, "| 類型:", typeof storeId);


        // 假資料 - 在此處直接加入 `coupons` 屬性
        const fakeCoupons = [
          {
            id: "1",
            image: "https://fruitlovelife.com/wp-content/uploads/2024/09/IMG_5817.jpg",
            name: "套餐A",
            price: 10000,
            storeId:storeId
          }
          // ,
          // {
          //   id: "2",
          //   image: "https://www.12hotpot.com.tw/images/demo/deco-menu.png",
          //   name: "套餐B",
          //   price: 400,
          // },
          // {
          //   id: "3",
          //   image: "https://www.sushiexpress.com.tw/images/Product/6458_s.png",
          //   name: "套餐C",
          //   price: 500,
          // },
        ];

      // 再 fetch 餐券資料
      if(storeId != null){
          const couponResponse = await fetch(`http://localhost:8080/coupons/selectCoupon?storeId=${storeId}`);
          if (!couponResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const couponData = await couponResponse.json();
          console.log("獲取到的餐券數據：", couponData);

          if(couponData.length>0){
              // 把 API 回來的資料填入 fakeCoupons，但不改變結構
              fakeCoupons.forEach((fakeCoupon, index) => {
                if (couponData[index]) {
                  fakeCoupon.id = couponData[index].couponId;
                  // fakeCoupon.image = couponData[index].image;
                    fakeCoupon.name = couponData[index].name;
                    fakeCoupon.price = couponData[index].price;
                  }
                });
              // 將假資料合併到後端獲取的餐廳資料中
                data.coupons = fakeCoupons;
          }
          
      }
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

      {/* 餐券展示區域 - 已經不需要另外的樣式，因為 CouponCard 已經處理了 */}
      <div style={styles.couponSection}>
        {restaurant.coupons && restaurant.coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} restaurantId={restaurant.id} />
        ))}
      </div>

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