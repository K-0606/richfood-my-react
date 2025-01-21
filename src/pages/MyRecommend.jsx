import React, { useState, useEffect } from 'react';
import { Button, Typography, Snackbar } from '@mui/material';

// 模擬餐廳資料（假設來自於後端）
const mockRestaurants = [
  {
    id: 1,
    name: "餐廳 A",
    address: "台中市南屯區公益路二段40號",
    phone: "04-1234-5678",
    score: 4.5,
    average: 350,
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    coordinates: { lat: 24.1450, lng: 120.6440 },
  },
  {
    id: 2,
    name: "餐廳 B",
    address: "台中市南屯區建國北路2段40號",
    phone: "04-2345-6789",
    score: 4.0,
    average: 400,
    image: "https://images.ctfassets.net/qyyefbvciouk/6EiDceR4zdg8I2gIVTi2Zd/a017eba720b85f431144e3d6120a9192/alex-haney-CAhjZmVk5H4-unsplash.jpg",
    coordinates: { lat: 24.1470, lng: 120.6400 },
  },
  {
    id: 3,
    name: "餐廳 C",
    address: "台中市西區民權路一段52號",
    phone: "04-3456-7890",
    score: 3.8,
    average: 300,
    image: "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg",
    coordinates: { lat: 24.1440, lng: 120.6830 },
  },
  {
    id: 4,
    name: "餐廳 D",
    address: "台中市南區建國路3段15號",
    phone: "04-4567-8901",
    score: 4.6,
    average: 450,
    image: "https://hips.hearstapps.com/hmg-prod/images/1-sipsip%E7%A9%BA%E6%99%AF%E7%85%A7-2-64ad1fbc88812.jpg?crop=1xw:1xh;center,top&resize=980:*",
    coordinates: { lat: 24.1530, lng: 120.6560 },
  },
  {
    id: 5,
    name: "餐廳 E",
    address: "台中市北區長春路145號",
    phone: "04-5678-9012",
    score: 4.7,
    average: 500,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSurJu4DWWE16FnL5qX-gQ_nM5JA9Ib-sc-mw&s",
    coordinates: { lat: 24.1740, lng: 120.6670 },
  },
];

// 計算兩個經緯度之間的距離（Haversine公式）
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 地球半徑 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 以公里為單位
  return distance;
};

// 隨機推薦餐廳
const recommendRestaurant = (setRecommendedRestaurant, userLocation) => {
  const nearbyRestaurants = mockRestaurants.filter((restaurant) => {
    const distance = calculateDistance(userLocation.lat, userLocation.lng, restaurant.coordinates.lat, restaurant.coordinates.lng);
    return distance <= 3; // 設定範圍，這裡是3公里內
  });

  if (nearbyRestaurants.length > 0) {
    // 隨機選擇一間在範圍內的餐廳
    const randomRestaurant = nearbyRestaurants[Math.floor(Math.random() * nearbyRestaurants.length)];
    setRecommendedRestaurant(randomRestaurant);

    // 顯示餐廳資訊及距離
    const distance = calculateDistance(userLocation.lat, userLocation.lng, randomRestaurant.coordinates.lat, randomRestaurant.coordinates.lng);
    console.log(`推薦的餐廳: ${randomRestaurant.name}`);
    console.log(`餐廳地址: ${randomRestaurant.address}`);
    console.log(`距離使用者: ${distance.toFixed(2)} 公里`);
  } else {
    setRecommendedRestaurant(null); // 如果沒有找到符合範圍的餐廳，清空推薦
  }
};

const MyRecommend = ({ setRecommendedRestaurant, setShowRecommendation }) => {
  const [userLocation, setUserLocation] = useState(null); // 使用者位置
  const [loading, setLoading] = useState(false); // 控制是否正在搜尋位置
  const [snackOpen, setSnackOpen] = useState(false); // 控制訊息顯示

  // 取得使用者的經緯度
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true); // 開始搜尋位置
      setSnackOpen(true); // 顯示「正在搜尋使用者位置...」訊息
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // 顯示使用者的位置
        console.log("使用者位置: ", position.coords.latitude, position.coords.longitude);
        setLoading(false); // 完成獲取位置，關閉加載狀態
        setSnackOpen(false); // 隱藏訊息
      });
    } else {
      alert("無法獲取位置");
    }
  };

  return (
    <div>
      {/* Snackbar 顯示正在搜尋的位置訊息 */}
      <Snackbar
        open={snackOpen}
        message="正在搜尋使用者位置..."
        autoHideDuration={1000} // 設定訊息顯示 1 秒後消失
      />

      <Button
        onClick={() => {
          if (!userLocation) {
            getUserLocation(); // 按下按鈕後搜尋位置
          } else {
            recommendRestaurant(setRecommendedRestaurant, userLocation);
            setShowRecommendation(true); // 顯示推薦卡片
          }
        }}
        sx={{
          backgroundColor: 'rgba(243, 178, 104, 0.78)', // 透明度 50%
          color: 'white',
          borderRadius: 3,
          boxShadow: 3,
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#FF8000',
            transform: 'scale(1.1)',
          },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ marginRight: 1 }}>推薦餐廳</Typography> {/* 按鈕文字 */}
      </Button>
    </div>
  );
};

export default MyRecommend;
