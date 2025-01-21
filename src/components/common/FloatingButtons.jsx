import React, { useState, useEffect } from 'react';
import { Box, IconButton, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
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

      {/* 顯示推薦餐廳的卡片 */}
      {showRecommendation && recommendedRestaurant && (
        <Card sx={{
          position: 'absolute',
          bottom: '110px',
          left: 0,
          right: 0,
          margin: 'auto',
          width: '350px',  // 增加卡片的寬度
        //   maxWidth: '100%',  // 保證寬度不會超過螢幕大小
          borderRadius: 2,  // 加上圓角
          boxShadow: 3,  // 增加陰影效果
        }}>
          {/* 圖片部分 */}
          <CardMedia
            component="img"
            image={recommendedRestaurant.image}
            alt={recommendedRestaurant.name}
            sx={{
              height: '250px',  // 增加圖片的高度
              width: '100%',  // 讓圖片填滿寬度
              objectFit: 'contain',  // 使圖片保持完整比例
              borderTopLeftRadius: '8px',  // 圓角效果
              borderTopRightRadius: '8px',  // 圓角效果
            }}
          />
          
          <CardContent sx={{ padding: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {recommendedRestaurant.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {recommendedRestaurant.address}
            </Typography>
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

      {/* 呼叫 MyRecommend 組件並顯示推薦 */}
      <MyRecommend
        setRecommendedRestaurant={setRecommendedRestaurant}
        setShowRecommendation={setShowRecommendation}
      />
    </Box>
  );
};

export default FloatingButtons;
