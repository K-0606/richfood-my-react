import React, { useState } from "react";
import { Card, CardContent, Typography, Rating, Button, Box } from "@mui/material";
import './ReviewSection.css'; // 引入樣式檔案

const fakeReviews = [
  { restaurantId: 1, reviewer: 'Alice', rating: 5, content: 'Excellent food and service! Highly recommended!' },
  { restaurantId: 1, reviewer: 'Bob', rating: 4, content: 'Good experience, but could improve ambiance.' },
  { restaurantId: 2, reviewer: 'Charlie', rating: 3, content: 'Decent food, but the wait was long.' },
  { restaurantId: 2, reviewer: 'David', rating: 2, content: 'Not great, the food was cold when it arrived.' },
  { restaurantId: 3, reviewer: 'Eve', rating: 5, content: 'Amazing place! Will come back for sure!' },
  { restaurantId: 3, reviewer: 'Frank', rating: 4, content: 'Great food, but a bit pricey.' },
  { restaurantId: 4, reviewer: 'Grace', rating: 5, content: 'Best restaurant I have been to! Absolutely loved it!' },
  { restaurantId: 5, reviewer: 'Helen', rating: 1, content: 'Worst experience ever. Will never come again.' },
  { restaurantId: 6, reviewer: 'Igor', rating: 3, content: 'Average experience, nothing special.' },
  { restaurantId: 7, reviewer: 'Judy', rating: 5, content: 'Fantastic! Worth every penny.' },
];

function ReviewSection() {
  const [reviews, setReviews] = useState(fakeReviews.slice(0, 6)); // 初始化顯示最新6條評論

  // 模擬新增評論的功能，並且將新評論加到開頭，並保持最大6條評論
  const addNewReview = (newReview) => {
    setReviews((prevReviews) => {
      const updatedReviews = [newReview, ...prevReviews]; // 新評論放在最前面
      return updatedReviews.slice(0, 6); // 保證最多顯示6條
    });
  };

  // 假設用戶提交評論後調用此函數
  const handleAddReview = () => {
    const newReview = {
      restaurantId: 1,
      reviewer: 'John',
      rating: 4,
      content: 'Great food but service can be faster!',
    };
    addNewReview(newReview);
  };

  return (
    <Box sx={{ width: '100%', marginTop: 2 }} className="review-section">
      <Typography variant="h5" gutterBottom>
        最新評論
      </Typography>
      
      {/* 顯示評論卡片 */}
      {reviews.map((review, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.primary">
              {review.reviewer}
            </Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              {review.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
      
      {/* 假設用戶點擊按鈕添加評論 */}
      <Button variant="contained" color="primary" onClick={handleAddReview} sx={{ marginTop: 2 }}>
        添加評論
      </Button>
    </Box>
  );
}

export default ReviewSection;
