import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, Link, Paper, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Comments = () => {
  const [reviews, setReviews] = useState([]); // 儲存後端返回的評論數據
  const [loading, setLoading] = useState(true); // 加載狀態
  const [error, setError] = useState(null); // 錯誤信息

  useEffect(() => {
    // 請求後端獲取評論數據
    axios
      .get('http://localhost:8080/Reviews/myReviews', { withCredentials: true })
      .then((response) => {
        setReviews(response.data); // 設置評論數據
        setLoading(false);
      })
      .catch((err) => {
        setError('無法加載評論，請稍後再試');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        我的評論
      </Typography>
      {reviews.map((review, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          {/* 餐廳名稱，點擊後跳轉到餐廳詳細頁面 */}
          <Link
            component={RouterLink}
            to={`/restaurant/${review.restaurantId}`} // 跳轉的餐廳 ID
            underline="hover"
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {review.restaurantName} {/* 顯示餐廳名稱 */}
            </Typography>
          </Link>

          {/* 評分 */}
          <Rating value={review.rating} readOnly sx={{ marginBottom: 1 }} />

          {/* 評論內容 */}
          <Typography sx={{ marginBottom: 1 }}>{review.content}</Typography>

          {/* 評論日期 */}
          <Typography variant="body2" color="text.secondary">
            評論時間：{new Date(review.createdAt).toLocaleDateString()} {/* 格式化日期 */}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Comments;
