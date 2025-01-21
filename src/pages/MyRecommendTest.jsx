import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { ArrowUpward, Close } from '@mui/icons-material';
import MyRecommend from '../../pages/MyRecommend'; // 引入你的 MyRecommend 組件

const FloatingButtons = () => {
  const [showRecommendation, setShowRecommendation] = useState(false); // 控制推薦顯示
  const [recommendedRestaurant, setRecommendedRestaurant] = useState(null); // 推薦的餐廳資料

  // 回到最上方的功能
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 關閉餐廳字卡
  const handleCloseCard = () => {
    setRecommendedRestaurant(null);
    setShowRecommendation(false);
  };

  // 页面重新加载后恢复初始状态
  useEffect(() => {
    setRecommendedRestaurant(null); // 确保没有推荐餐厅
    setShowRecommendation(false); // 确保按鈕顯示
  }, []);

  return (
    <Box sx={{ position: 'fixed', left: 20, bottom: 20, zIndex: 999 }}>
      {/* 回到最上方的按鈕 */}
      <IconButton
        onClick={handleBackToTop}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          marginBottom: 2,
          boxShadow: 3,
        }}
      >
        <ArrowUpward />
      </IconButton>

      {/* 顯示推薦餐廳的按鈕 */}
      <MyRecommend
        setRecommendedRestaurant={setRecommendedRestaurant}
        setShowRecommendation={setShowRecommendation}
      />

      {/* 顯示推薦餐廳的卡片 */}
      {showRecommendation && recommendedRestaurant && (
        <Card sx={{ position: 'absolute', bottom: '80px', left: 0, right: 0, margin: 'auto', maxWidth: 300 }}>
          <CardMedia
            component="img"
            height="140"
            image={recommendedRestaurant.image}
            alt={recommendedRestaurant.name}
          />
          <CardContent>
            <Typography variant="h6">{recommendedRestaurant.name}</Typography>
            <Typography variant="body2">{recommendedRestaurant.address}</Typography>
          </CardContent>
          {/* 關閉按鈕 */}
          <IconButton
            onClick={handleCloseCard}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '50%',
              color: 'gray',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
              },
            }}
          >
            <Close />
          </IconButton>
        </Card>
      )}
    </Box>
  );
};

export default FloatingButtons;
