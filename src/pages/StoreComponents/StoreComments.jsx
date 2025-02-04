import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, Button, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';

const StoreComments = ({ restaurantId }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const commentsPerPage = 10;

  useEffect(() => {
    console.log("Fetching comments for restaurantId:", restaurantId);

    if (!restaurantId) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/Reviews/restaurant/${restaurantId}`);
        const data = await response.json();
        console.log("Fetched comments:", data);
        setComments(data);
      } catch (error) {
        setError("無法獲取評論，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [restaurantId]);

  const getCommentsForPage = () => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    return comments.slice(startIndex, startIndex + commentsPerPage);
  };

  return (
    <div>
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>載入中，請稍候...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : comments.length === 0 ? (
        <Typography sx={{ textAlign: 'center', my: 4 }}>目前沒有評論</Typography>
      ) : (
        getCommentsForPage().map((comment) => (
          <Box
            key={comment.reviewId}
            sx={{
              mb: 2,
              p: 3,
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
              {comment.userName}（{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}）
            </Typography>
            <Typography variant="body2" sx={{ my: 1, color: '#555' }}>
              {comment.content}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={comment.rating} readOnly precision={1} />
              <Typography variant="body2" sx={{ ml: 1, color: '#777' }}>
                {comment.rating} / 5
              </Typography>
            </Box>
          </Box>
        ))
      )}

      {/* 分頁控制 */}
      {comments.length > commentsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            上一頁
          </Button>
          <Typography variant="body2" sx={{ mx: 2 }}>
            第 {currentPage} 頁，共 {Math.ceil(comments.length / commentsPerPage)} 頁
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * commentsPerPage >= comments.length}
          >
            下一頁
          </Button>
        </Box>
      )}
    </div>
  );
};

export default StoreComments;
