import React, { useState } from 'react';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';

// 假設的餐廳資料（包含地址）
const restaurants = [
  { id: 1, name: '餐廳A', city: '台中市', area: '南屯區', address: '公益路二段80號' },
  { id: 2, name: '餐廳B', city: '台中市', area: '南屯區', address: '公益路二段90號' },
  { id: 3, name: '餐廳C', city: '台中市', area: '南屯區', address: '建國北路10號' },
  { id: 4, name: '餐廳D', city: '台中市', area: '南屯區', address: '大墩路15號' },

  // 3 公里範圍內
  // { id: 6, name: '餐廳F', city: '台中市', area: '南區', address: '建國南路10號' },
  { id: 7, name: '餐廳G', city: '台中市', area: '南區', address: '建國南路20號' },
  { id: 8, name: '餐廳H', city: '台中市', area: '南區', address: '五權南路15號' },
  { id: 9, name: '餐廳I', city: '台中市', area: '南區', address: '文心南路50號' },
  { id: 10, name: '餐廳J', city: '台中市', area: '南區', address: '五權南路30號' },

  // 5 公里範圍內
  { id: 11, name: '餐廳K', city: '台中市', area: '西區', address: '建國路40號' },
  { id: 12, name: '餐廳L', city: '台中市', area: '西區', address: '建國路50號' },
  { id: 13, name: '餐廳M', city: '台中市', area: '西區', address: '建國路60號' },
  { id: 14, name: '餐廳N', city: '台中市', area: '西區', address: '建國路70號' },
  { id: 15, name: '餐廳O', city: '台中市', area: '西區', address: '建國路80號' },

  // 10 公里範圍內
  { id: 16, name: '餐廳P', city: '台中市', area: '西區', address: '自由路一段10號' },
  { id: 17, name: '餐廳Q', city: '台中市', area: '西區', address: '自由路一段20號' },
  { id: 18, name: '餐廳R', city: '台中市', area: '西區', address: '建國路40號' },
  { id: 19, name: '餐廳S', city: '台中市', area: '西區', address: '自由路一段50號' },
  { id: 20, name: '餐廳T', city: '台中市', area: '西區', address: '建國路50號' }
];

// 使用 Google Maps Geocoding API 來將地址轉換為經緯度
const getCoordinatesFromAddress = async (address) => {
  const apiKey = 'AIzaSyBECL-R3_7fScccBTBJtA3cMCOa86F9rfg';  // 請填入你的 API 金鑰
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    console.log(`發送請求的地址: ${address}`);  // 打印每一筆處理的地址

    const response = await axios.get(url);
    console.log("Google API 回應:", response.data); // 打印API返回的結果

    const location = response.data.results[0]?.geometry.location;
    if (location) {
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error(`無法解析地址: ${address}`); // 顯示無法解析的地址
      throw new Error('無法取得經緯度');
    }
  } catch (error) {
    console.error(`地理編碼錯誤 - 地址: ${address}`, error);  // 顯示錯誤的詳細信息
    return null;
  }
};


// 計算兩個經緯度之間的距離（使用 Haversine 公式）
const getDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // 地球半徑 (單位: 公里)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 返回距離 (單位: 公里)
};

const MyRecommend = () => {
  const [userLocation, setUserLocation] = useState(null); // 使用者位置
  const [recommendedRestaurant, setRecommendedRestaurant] = useState(null); // 推薦的餐廳

  // 獲取使用者的地理位置
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log('使用者位置:', { latitude, longitude }); // 顯示位置
        },
        (error) => {
          alert('無法取得位置');
        }
      );
    } else {
      alert('瀏覽器不支援定位功能');
    }
  };

  // 推薦餐廳
  const recommendRestaurant = async () => {
    if (!userLocation) {
      alert('請先獲取位置');
      return;
    }

    const { latitude, longitude } = userLocation;

    // 轉換餐廳地址為經緯度
    const restaurantWithCoordinates = await Promise.all(
      restaurants.map(async (restaurant) => {
        const coordinates = await getCoordinatesFromAddress(restaurant.address);
        return { ...restaurant, coordinates };
      })
    );

    // 篩選出1公里內的餐廳
    const nearbyRestaurants = restaurantWithCoordinates.filter((restaurant) => {
      if (!restaurant.coordinates) return false;
      const { lat, lng } = restaurant.coordinates;
      const distance = getDistance(latitude, longitude, lat, lng);
      return distance <= 5; // 篩選1公里內的餐廳
    });

    // 隨機推薦一間餐廳
    if (nearbyRestaurants.length > 0) {
      const randomRestaurant =
        nearbyRestaurants[Math.floor(Math.random() * nearbyRestaurants.length)];
      setRecommendedRestaurant(randomRestaurant);
      console.log('推薦餐廳:', randomRestaurant); // 打印推薦餐廳
    } else {
      alert('附近沒有餐廳');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        隨機推薦餐廳
      </Typography>

      {/* 按鈕區域 */}
      <Button variant="contained" color="primary" onClick={getUserLocation}>
        獲取位置
      </Button>
      <Button variant="contained" color="secondary" onClick={recommendRestaurant} sx={{ ml: 2 }}>
        推薦餐廳
      </Button>

      {/* 顯示使用者位置 */}
      {userLocation && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          使用者位置: {userLocation.latitude}, {userLocation.longitude}
        </Typography>
      )}

      {/* 顯示推薦餐廳 */}
      {recommendedRestaurant && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">推薦餐廳：</Typography>
            <Typography variant="body1">{recommendedRestaurant.name}</Typography>
            <Typography variant="body2">
              {recommendedRestaurant.city} {recommendedRestaurant.area} {recommendedRestaurant.address}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MyRecommend;
