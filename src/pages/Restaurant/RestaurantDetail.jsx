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
  const { id } = useParams(); // 从 URL 中获取餐厅ID
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 用于触发 ReviewSection 再次抓取评论的 state
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const [coupons, setCoupons] = useState([]); // 新增一个 state 来存储 coupons

  // 用来触发 MyMap 重新渲染的 state
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
        // console.log("獲取到的餐廳數據：", data);

        const storeId = data.storeId;
        // console.log(  "我要的!!!"+id);
        console.log("我要的!!!" + storeId);
        console.log("取得的 storeId:", storeId, "| 類型:", typeof storeId);

        // 假数据 - 在此处直接加入 `coupons` 属性
        const fakeCoupons = [
          {
            id: "1",
            image:
              "https://fruitlovelife.com/wp-content/uploads/2024/09/IMG_5817.jpg",
            name: "套餐A",
            price: 10000,
            storeId: storeId,
          },
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
        if (storeId != null) {
          const couponResponse = await fetch(
            `http://localhost:8080/coupons/selectCoupon?storeId=${storeId}`
          );
          if (!couponResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const couponData = await couponResponse.json();
          console.log("獲取到的餐券數據：", couponData);

          if (couponData.length > 0) {
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
        // 将假数据合并到后端获取的餐厅数据中
        data.coupons = fakeCoupons;

        setRestaurant(data);
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
        setMapReloadTrigger((prev) => !prev);  // 翻转 mapReloadTrigger
      }, 500);  // 延迟 0.5 秒后更新 MyMap
    }
  }, [restaurant]);  // 只在 restaurant 加载完成后执行

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

      {/* MyMap 组件，使用 mapReloadTrigger 来强制重新渲染 */}
      <MyMap
        key={mapReloadTrigger}  
        restaurantName={restaurant.name} // 传递餐厅名称
        latitude={restaurant.latitude}
        longitude={restaurant.longitude}
        restaurantImage={restaurant.image} // 传递餐厅图片
      />

      {/* 餐券展示区域 */}
      <div style={styles.mapcomponent}>
        {/* <MapComponent
          latitude={restaurant.latitude} // 传递 latitude
          longitude={restaurant.longitude} // 传递 longitude
        /> */}
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
  mapcomponent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    justifyContent: "space-between", // 可以调整对齐方式
    alignItems: "flex-start",
    backgroundColor: "gray",
    flex: "1 1 200px",
    minWidth: "200px",
  },
  couponSection: {
    display: "flex",
    flexDirection: "column", // 改为垂直排列
    alignItems: "flex-end", // 居中显示
    marginTop: "20px",
    marginRight: "150px",
    padding: "0 10px", // 一些内边距以免餐券过于拥挤
    transform: "translateX(800px)",
  },
};

export default RestaurantDetail;
