import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Avatar, Grid } from '@mui/material';
import StoreComments from './StoreComponents/StoreComments';
import StoreReservations from './StoreComponents/StoreReservations';
import StoreCoupons from './StoreComponents/StoreCoupons';
import StoreUpdateInfo from './StoreComponents/StoreUpdateInfo';
import ReservationManagement from './StoreComponents/ReservationManagement'; 
import Rating from '@mui/material/Rating';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
//import StoreQRCodeScanner from './StoreComponents/StoreQRCodeScanner'; // 新增掃描器組件
import { useUser } from "../context/UserContext"; 

const StoreLoginPage = () => {
  const [activeTab, setActiveTab] = useState("comments");
  const [storeData, setStoreData] = useState({
    // name: "Test Store",
    // avatar: "https://example.com/avatar.png",
    // address: "1234 Test St",
    // businessHours: "9:00 AM - 9:00 PM",
    // phone: "(123) 456-7890",
    // reviewsCount: 100,
    // favoritesCount: 50,
    // averageRating: 4.5,
  });
  const { user } = useUser(); // 取得登入的店家資料
  const storeId = user?.storeId; // 從 context 取得 storeId


  // 更新店家資料
  const handleUpdateStoreData = (updatedData) => {
    setStoreData(updatedData); // 更新店家資料
  };
  useEffect(() => {
    if (!storeId) return; // 確保 storeId 存在

    const fetchStoreData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/store/getStore?storeId=${storeId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setStoreData({
          name: data.restaurants.name || "Test Store",
          avatar: data.icon.replace(/^"|"$/g, '') || "https://example.com/avatar.png",
          // address:  "N/A",
          // businessHours: "N/A",
          // phone:  "N/A",
          // reviewsCount:0,
          // favoritesCount: 0,
          averageRating: data.restaurants.score  ||  0,
          restaurantID:data.restaurants.restaurantId
        });
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
  }, [storeId]); // 當 storeId 變更時重新請求

  useEffect(() => {
    console.log("OK fetch",storeData.restaurantID)
    if (!storeData.restaurantID) return; // 確保 restaurantID 存在
  
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Reviews/restaurant/${storeData.restaurantID}`, {
          method: "GET",
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const reviewData = await response.json();

        console.log(reviewData.length)
        setStoreData((prevData) => ({
          ...prevData,
          reviewsCount: reviewData.length || 0, // 假設 reviews 是陣列，計算數量
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    fetchReviews();
  }, [storeData.restaurantID]);

  useEffect(() => {
    console.log("OK fetch",storeData.restaurantID)
    if (!storeData.restaurantID) return; // 確保 restaurantID 存在
  
    const fetchFavorite = async () => {
      try {
        const response = await fetch(`http://localhost:8080/favorite/favoriteRestaurantCount/${storeData.restaurantID}`, {
          method: "GET",
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const favoriteData = await response.json();

        console.log(favoriteData)
        setStoreData((prevData) => ({
          ...prevData,
          favoritesCount: favoriteData || 0, // 假設 reviews 是陣列，計算數量
        }));
      } catch (error) {
        console.error("Error fetching favoriteData:", error);
      }
    };
  
    fetchFavorite();
  }, [storeData.restaurantID]);








  return (
    <>
    <Header/>
    <Box sx={{ p: 3 }}>
      {/* 店家頭像和名稱區域 */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt={storeData.name} src={storeData.avatar} sx={{ width: 120, height: 120 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{storeData.name}</Typography>
          <Typography variant="body1">評論數量: {storeData.reviewsCount}</Typography>
          <Typography variant="body1">珍藏數量: {storeData.favoritesCount}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating 
              value={storeData.averageRating || 0}  // 確保有值
              readOnly 
              precision={0.1} 
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {storeData.averageRating || 0} / 5
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 按鈕區域 */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={() => setActiveTab("comments")} sx={{ mr: 2 }}>所有評論</Button>
        <Button variant="contained" onClick={() => setActiveTab("reservations")} sx={{ mr: 2 }}>已預約日期</Button>
        <Button variant="contained" onClick={() => setActiveTab("reservationManagement")} sx={{ mr: 2 }}>預約管理</Button> {/* 新增預約管理按鈕 */}
        <Button variant="contained" onClick={() => setActiveTab("coupons")} sx={{ mr: 2 }}>餐券管理</Button>
        <Button variant="contained" onClick={() => setActiveTab("updateInfo")} sx={{ mr: 2 }}>更新資訊</Button>
      </Box>

      {/* 顯示不同內容區域 */}
      <Box sx={{ mt: 3 }}>
        {activeTab === "comments" && <StoreComments />}
        {activeTab === "reservations" && <StoreReservations />}
        {activeTab === "coupons" && <StoreCoupons />}
        {activeTab === "updateInfo" && <StoreUpdateInfo storeData={storeData} onUpdateStoreData={handleUpdateStoreData} />}
        {activeTab === "reservationManagement" && <ReservationManagement />} {/* 顯示預約管理頁面 */}
      </Box>

      {/* QR Code 掃描器區域 */}
      {/* {activeTab === "coupons" && (
        <StoreQRCodeScanner />
      )} */}
    </Box>
    <Footer/>
    </>
  );
};

export default StoreLoginPage;
