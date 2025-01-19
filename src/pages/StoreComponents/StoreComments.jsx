import React, { useState } from 'react';
import { Box, Typography, Rating, Button } from '@mui/material';

// 假資料
const allComments = [
  { text: "這家餐廳真的很好吃！", rating: 5 },
  { text: "服務態度不錯，但等菜有點久。", rating: 3 },
  { text: "環境很棒，值得推薦！", rating: 4 },
  { text: "口味還不錯，但服務有待改進", rating: 2 },
  { text: "非常滿意，會再來！", rating: 5 },
  { text: "價格偏高，但份量很足", rating: 4 },
  { text: "地點很方便，還會再來！", rating: 4 },
  { text: "不錯的用餐經驗，會介紹朋友來", rating: 3 },
  { text: "食物很好吃，但等候時間太長", rating: 2 },
  { text: "值得再來，食物和服務都很好", rating: 5 },
  { text: "服務態度有待改進", rating: 1 },
  { text: "整體來說還可以，但期待更好的表現", rating: 3 },
];

const StoreComments = () => {
  const [currentPageComments, setCurrentPageComments] = useState(1);
  const commentsPerPage = 10;

  const handlePageChangeComments = (page) => {
    setCurrentPageComments(page);
  };

  const getCommentsForPage = () => {
    const startIndex = (currentPageComments - 1) * commentsPerPage;
    return allComments.slice(startIndex, startIndex + commentsPerPage);
  };

  return (
    <div>
      {getCommentsForPage().map((comment, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {comment.text}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={comment.rating} readOnly precision={1} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {comment.rating} / 5
            </Typography>
          </Box>
        </Box>
      ))}
      {/* 頁碼控制 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChangeComments(currentPageComments - 1)}
          disabled={currentPageComments === 1}
        >
          上一頁
        </Button>
        <Typography variant="body2" sx={{ mx: 2 }}>
          第 {currentPageComments} 頁
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handlePageChangeComments(currentPageComments + 1)}
          disabled={currentPageComments * commentsPerPage >= allComments.length}
        >
          下一頁
        </Button>
      </Box>
    </div>
  );
};

export default StoreComments;
