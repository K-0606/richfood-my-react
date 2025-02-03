import React, { useState } from 'react';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const RestaurantInfo = React.memo(({ restaurant }) => {
  const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "8px", // 圓角效果
    transition: "all 0.3s ease", // 添加平滑過渡效果
    cursor: "pointer", // 鼠標指針樣式
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // 鼠標懸浮時改變背景色
      transform: "scale(1.1)", // 鼠標懸浮時放大
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // 添加陰影效果
    },
  }));

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(2); // 初始評分為2顆星
  const [comment, setComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // 模擬登入狀態
  const storeId = restaurant.storeId;

  const handleBookRedirect = () => {
    navigate("/book", { state: { storeId: restaurant.id } }); // 傳遞 restaurantId
  };

  const handleOpenDialog = () => {
    if (isLoggedIn) {
      setOpenDialog(true);
    } else {
      alert("請先登入！");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(2); // 重設評分
    setComment(""); // 重設評論
  };

  const handleSubmitReview = () => {
    // 可在此處發送 API 請求來提交評論
    console.log("提交的評論:", comment);
    console.log("提交的評分:", rating);
    alert("評論已提交！");
    handleCloseDialog();
  };

  return (
    <div style={styles.infoContainer}>
      <h1 style={styles.restaurantName}>{restaurant.name}</h1>
      <div style={styles.detailsContainer}>
        <div style={styles.detailItem}>
          <strong>類型: </strong>
          <span>{restaurant.type}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>地區: </strong>
          <span>{restaurant.region}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>評分: </strong>
          <span>{'⭐'.repeat(restaurant.rating)}{'☆'.repeat(5 - restaurant.rating)}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>平均消費: </strong>
          <span>${restaurant.price}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>地址: </strong>
          <span>{restaurant.address}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>營業時間: </strong>
          <span>{restaurant.hours}</span>
        </div>
        <div>
          <Item1 onClick={handleBookRedirect}>預約</Item1>
          <Item1 onClick={handleOpenDialog}>評論</Item1> {/* 點擊評論彈出框 */}
        </div>
      </div>

      {/* 評論彈窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>留下您的評論</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            max={5}
          />
          <TextField
            label="您的評論"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmitReview}>提交</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

// 增強版樣式
const styles = {
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '50%',  // 讓餐廳資訊區域與圖片一致寬度
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  restaurantName: {
    fontSize: '2rem',  // 更大的字體
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',  // 增加間距，讓每項資訊不擁擠
  },
  detailItem: {
    fontSize: '1.1rem',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
  },
};

export default RestaurantInfo;
