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

const StoreLoginPage = () => {
  const [activeTab, setActiveTab] = useState("comments");
  const [storeData, setStoreData] = useState({
    name: "Test Store",
    avatar: "https://example.com/avatar.png",
    address: "1234 Test St",
    businessHours: "9:00 AM - 9:00 PM",
    phone: "(123) 456-7890",
    reviewsCount: 100,
    favoritesCount: 50,
    averageRating: 4.5,
  });

  // 更新店家資料
  const handleUpdateStoreData = (updatedData) => {
    setStoreData(updatedData); // 更新店家資料
  };

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
