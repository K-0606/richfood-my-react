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
import MyMap from "../../components/common/MyMap";

const RestaurantDetail = () => {
  const { id } = useParams(); //  URL 中餐廳ID
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 觸發 ReviewSection 再次抓取評論的 state
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const [coupons, setCoupons] = useState([]); // 新增儲存 coupons

  //  MyMap 重新渲染的 state
  const [mapReloadTrigger, setMapReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const storeId = data.storeId; // storeId 可能是 null
        let couponData = [];

        // 只有在 storeId 存在的情況下才抓取餐券資料
        if (storeId != null) {
          const couponResponse = await fetch(
            `http://localhost:8080/coupons/selectCoupon?storeId=${storeId}`
          );
          if (!couponResponse.ok) {
            throw new Error("Network response was not ok");
          }

          couponData = await couponResponse.json();
          console.log("獲取到的餐券數據：", couponData);

          couponData = (couponData || []).map((coupon) => ({
            id: coupon.couponId,
            image:
              coupon.couponpic ||
              "https://fruitlovelife.com/wp-content/uploads/2024/09/IMG_5817.jpg",
            name: coupon.name,
            price: coupon.price,
            storeId: storeId,
          }));
          setCoupons(couponData);
          data.coupons = couponData; // 設定餐廳的餐券
        }

        setRestaurant(data); // 設定餐廳資料
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  // 让子组件调用的 callback：一旦评论提交成功，就翻转 refreshTrigger
  const handleReviewSubmitted = () => {
    setRefreshTrigger((prev) => !prev);
  };

  // 触发 MyMap 重新渲染
  useEffect(() => {
    if (restaurant) {
      setTimeout(() => {
        setMapReloadTrigger((prev) => !prev); // 翻转 mapReloadTrigger
      }, 500); // 延迟 0.5 秒后更新 MyMap
    }
  }, [restaurant]); // 只在 restaurant 加载完成后执行

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurant) return <div>No restaurant data found!</div>;

  return (
    <>
      <Header />
      <div className="restaurant-detail-container" style={styles.container}>
        <div className="restaurant-detail-content" style={styles.content}>
          {/* 左边轮播图 */}
          <RestaurantImageCarousel images={[restaurant.image]} />

          {/* 右边餐厅信息：把 onReviewSubmitted 传给子组件 */}
          <RestaurantInfo
            restaurant={restaurant}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
      </div>
      <div style={styles.mymap}>
        {/* MyMap 组件，使用 mapReloadTrigger 来强制重新渲染 */}
        <MyMap
          key={mapReloadTrigger}
          restaurantName={restaurant.name} // 传递餐厅名称
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
          restaurantImage={restaurant.image} // 传递餐厅图片
        />

        {/* 餐券展示区域 */}
        <div style={styles.couponSection}>
          {restaurant.coupons &&
            restaurant.coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                restaurantId={restaurant.id}
              />
            ))}
        </div>
      </div>
      {/* 评论列表 */}
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
  mymap: {
    width: "100%", // 确保 MyMap 组件填满父容器的宽度
    height: "auto", // 根据需要调整高度
    marginBottom: "20px", // 给 MyMap 和餐券之间留出一些间距
  },
  couponSection: {
    display: "flex",
    flexDirection: "column", // 改为垂直排列
    alignItems: "flex-end", // 居中显示
    marginRight: "100px",
    padding: "0 10px", // 一些内边距以免餐券过于拥挤
  },
};

export default RestaurantDetail;
