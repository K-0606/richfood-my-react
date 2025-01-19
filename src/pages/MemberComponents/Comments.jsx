import React from 'react';
import { Box, Typography, Rating, Link, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';  // 引入 react-router-dom 的 Link

const Comments = () => {
  // 假設有一個評論數組
  const reviews = [
    {
      restaurantName: '餐廳A',
      restaurantId: '',  // 餐廳 ID，用來作為路由參數
      rating: 4,
      comment: '食物非常好，服務也很棒！',
      date: '2025-01-10',  // 假設評論時間
    },
    {
      restaurantName: '餐廳B',
      restaurantId: '',
      rating: 5,
      comment: '環境很優雅，非常推薦！',
      date: '2025-01-15',
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>我的評論</Typography>
      {reviews.map((review, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          {/* 餐廳名稱，點擊後會跳轉到餐廳詳細頁面 */}
          <Link component={RouterLink} to={`/StorePage/${review.restaurantId}`} underline="hover">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {review.restaurantName}
            </Typography>
          </Link>

          {/* 評分 */}
          <Rating value={review.rating} readOnly sx={{ marginBottom: 1 }} />

          {/* 評論內容 */}
          <Typography sx={{ marginBottom: 1 }}>{review.comment}</Typography>

          {/* 評論日期 */}
          <Typography variant="body2" color="text.secondary">
            評論時間：{review.date}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Comments;
