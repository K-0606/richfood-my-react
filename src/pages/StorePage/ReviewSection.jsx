import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Rating } from "@mui/material";

function ReviewSection({ restaurantId, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!restaurantId) {
      console.error("Invalid restaurantId:", restaurantId);
      return;
    }

    // 發送 API 請求獲取評論
    console.log("Fetching reviews for restaurantId:", restaurantId);
    fetch(`http://localhost:8080/Reviews/restaurant/${restaurantId}`)
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
        setReviews([]); // 如果出錯則設置空評論
      });
  }, [restaurantId, refreshTrigger]);

  // 如果沒有評論則不渲染內容
  if (!reviews || reviews.length === 0) {
    return null; // 不渲染任何內容
  }

  return (
    <Box sx={{ width: "100%", marginBottom: "20px" }}>
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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              {review.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ReviewSection;
