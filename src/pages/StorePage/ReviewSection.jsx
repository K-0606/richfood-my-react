import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Rating } from "@mui/material";

function ReviewSection({ restaurantId, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurantId) {
      console.error("Invalid restaurantId:", restaurantId);
      return;
    }

    // 重置載入狀態與錯誤
    setIsLoading(true);
    setError(null);

    console.log("Fetching reviews for restaurantId:", restaurantId);
    fetch(`http://localhost:8080/Reviews/restaurant/${restaurantId}?t=${Date.now()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Reviews Data:", data);
        setReviews(data || []); // 確保數據為陣列
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setError(error);
        setReviews([]); // 如果出錯則設置空評論
      })
      .finally(() => {
        setIsLoading(false);
      })
      
  }, [restaurantId, refreshTrigger]);

  // 1) 載入中狀態
  if (isLoading) {
    return (
      <Box
        sx={{
          marginLeft: "150px",
          marginTop: "30px",
        }}
      >
        <Typography variant="body1">載入中...</Typography>
      </Box>
    );
  }

  // 2) 錯誤狀態
  if (error) {
    return (
      <Box
        sx={{
          marginLeft: "150px",
          marginTop: "30px",
        }}
      >
        <Typography variant="body1" color="error">
          載入評論失敗：{error.message}
        </Typography>
      </Box>
    );
  }

  // 3) 尚無評論
  if (!reviews || reviews.length === 0) {
    return (
      <Box
        sx={{
          marginLeft: "150px",
          marginTop: "30px",
        }}
      >
        <Typography variant="body1">尚無評論</Typography>
      </Box>
    );
  }

  // 4) 有評論才渲染
  return (
    <Box
      sx={{
        display: "inline-block",
        width: "30%",
        position: "relative",
        marginLeft: "150px",
        marginTop: "30px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="review-section"
    >
      <Typography variant="h5" gutterBottom>
        最新評論
      </Typography>
      {reviews.map((review) => (
        <Card key={review.reviewId} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" color="text.primary">
              {review.userName}
            </Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              {review.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ReviewSection;
