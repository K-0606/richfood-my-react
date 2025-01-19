import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

// 使用 Google Maps Geocoding API 來將地址轉換為經緯度
const getCoordinatesFromAddress = async (address) => {
  const apiKey = 'AIzaSyBECL-R3_7fScccBTBJtA3cMCOa86F9rfg'; // 請填入你的 API 金鑰
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const location = response.data.results[0]?.geometry.location;
    if (location) {
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('無法取得經緯度');
      console.error(`地址無法解析: ${address}`);
    }
  } catch (error) {
    console.error(`地理編碼錯誤 - 地址: ${address}`, error);
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
  const [restaurants, setRestaurants] = useState([]); // 餐廳資料
  const [userLocation, setUserLocation] = useState(null); // 使用者位置
  const [recommendedRestaurant, setRecommendedRestaurant] = useState(null); // 推薦的餐廳

  // 獲取餐廳資料
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/restaurantsss');
      setRestaurants(response.data);
      console.log('餐廳資料:', response.data);
    } catch (error) {
      console.error('獲取餐廳資料失敗:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // 獲取使用者的地理位置
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log('使用者位置:', { latitude, longitude });
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

    // 篩選出5公里內的餐廳
    const nearbyRestaurants = restaurantWithCoordinates.filter((restaurant) => {
      if (!restaurant.coordinates) return false;
      const { lat, lng } = restaurant.coordinates;
      const distance = getDistance(latitude, longitude, lat, lng);
      return distance <= 500;
    });

    // 隨機推薦一間餐廳
    if (nearbyRestaurants.length > 0) {
      const randomRestaurant =
        nearbyRestaurants[Math.floor(Math.random() * nearbyRestaurants.length)];
      setRecommendedRestaurant(randomRestaurant);
      console.log('推薦餐廳:', randomRestaurant);
    } else {
      alert('附近沒有餐廳');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        隨機推薦餐廳
      </Typography>

      <Button variant="contained" color="primary" onClick={getUserLocation}>
        獲取位置
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={recommendRestaurant}
        sx={{ ml: 2 }}
      >
        推薦餐廳
      </Button>

      {userLocation && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          使用者位置: {userLocation.latitude}, {userLocation.longitude}
        </Typography>
      )}

      {recommendedRestaurant && (
        <Card sx={{ mt: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={recommendedRestaurant.image}
            alt={recommendedRestaurant.name}
          />
          <CardContent>
            <Typography variant="h6">推薦餐廳：</Typography>
            <Typography variant="body1">{recommendedRestaurant.name}</Typography>
            <Typography variant="body2">
              地址: {recommendedRestaurant.address}
            </Typography>
            <Typography variant="body2">
              電話: {recommendedRestaurant.phone}
            </Typography>
            <Typography variant="body2">
              評分: {recommendedRestaurant.score}
            </Typography>
            <Typography variant="body2">
              平均消費: {recommendedRestaurant.average}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MyRecommend;
