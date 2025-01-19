// src/components/Collections.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';  // 引入 Link 用於路由跳轉

const Collections = () => {
  // 假資料，模擬從後端獲取
  const collections = [
    {
      id: 1,
      name: "餐廳 A",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/%E9%A9%A2%E5%AD%90%E9%A4%90%E5%BB%B3-%E6%98%A5%E5%A4%A7%E7%9B%B4%E5%BA%97%E7%A9%BA%E6%99%AF-3-1675833220.jpg",  // 假圖片URL
      hours: "10:00 AM - 9:00 PM",
      address: "地址 1, 台北市",
    },
    {
      id: 2,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 3,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 4,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 5,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 6,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 7,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 8,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },
    {
      id: 9,
      name: "餐廳 B",
      imageUrl: "https://sansalife.com/wp-content/uploads/2024/08/ffood-190_%E7%BB%93%E6%9E%9C.jpg",  // 假圖片URL
      hours: "11:00 AM - 10:00 PM",
      address: "地址 2, 新北市",
    },

  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的珍藏
      </Typography>
      <Grid container spacing={3}>
        {collections.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              {/* 餐廳圖片 */}
              <CardMedia
                component="img"
                alt={item.name}
                height="200"
                image={item.imageUrl}
              />
              <CardContent>
                {/* 餐廳名稱，點擊後跳轉 */}
                <Link to={`/store/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                </Link>

                {/* 營業時間 */}
                <Typography variant="body2" color="text.secondary">
                  <strong>營業時間：</strong> {item.hours}
                </Typography>

                {/* 地址 */}
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  <strong>地址：</strong> {item.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Collections;
