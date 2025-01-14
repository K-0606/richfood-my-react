// src/StoreLoginPage.jsx
import React, { useState } from 'react';
import { Button, Grid, Typography, Avatar, Box, Paper, Rating, TextField } from '@mui/material';

// 假資料
const initialStoreData = {
  id: "12345",
  name: "美味餐廳",
  avatar: "https://via.placeholder.com/150", // 假設一張店家頭像
  reviewsCount: 12,
  favoritesCount: 85,
  averageRating: 4.2, // 假設店家的平均評分是4.2顆星
  account: "store_owner@example.com", // 假帳號
};

// 假設每條評論和對應的評分
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

// 假設有15條已預約日期資料
const reservations = [
  { date: "2025-01-15", time: "中午", peopleCount: 2 },
  { date: "2025-01-16", time: "晚上", peopleCount: 4 },
  { date: "2025-01-17", time: "中午", peopleCount: 6 },
  { date: "2025-01-18", time: "晚上", peopleCount: 3 },
  { date: "2025-01-19", time: "中午", peopleCount: 2 },
  { date: "2025-01-20", time: "晚上", peopleCount: 5 },
  { date: "2025-01-21", time: "中午", peopleCount: 8 },
  { date: "2025-01-22", time: "晚上", peopleCount: 4 },
  { date: "2025-01-23", time: "中午", peopleCount: 3 },
  { date: "2025-01-24", time: "晚上", peopleCount: 2 },
  { date: "2025-01-25", time: "中午", peopleCount: 4 },
  { date: "2025-01-26", time: "晚上", peopleCount: 6 },
  { date: "2025-01-27", time: "中午", peopleCount: 5 },
  { date: "2025-01-28", time: "晚上", peopleCount: 3 },
  { date: "2025-01-29", time: "中午", peopleCount: 7 },
];

const StoreLoginPage = () => {
  const [activeTab, setActiveTab] = useState("comments");

  // 使用狀態來儲存店家資訊，並且在修改時即時更新顯示
  const [storeData, setStoreData] = useState(initialStoreData);

  // 編輯店家資訊
  const [editStoreData, setEditStoreData] = useState({
    name: storeData.name,
    account: storeData.account,
    newPassword: "",
    confirmPassword: "",
  });

  // 控制更新資訊的表單
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStoreData({
      ...editStoreData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // 表單驗證
    if (editStoreData.newPassword !== editStoreData.confirmPassword) {
      alert("密碼和確認密碼不一致！");
      return;
    }

    // 更新 storeData 並且顯示成功訊息
    setStoreData({
      ...storeData,
      name: editStoreData.name, // 更新餐廳名稱
      account: editStoreData.account, // 更新帳號
    });
    alert("店家資訊更新成功！");
    
    // 呼叫後端 API 更新資料庫
    try {
      const response = await fetch('/api/updateStoreInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: storeData.id,
          name: editStoreData.name,
          account: editStoreData.account,
          newPassword: editStoreData.newPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert('資料已成功更新！');
      } else {
        alert('資料更新失敗，請重試');
      }
    } catch (error) {
      console.error('更新資料庫時發生錯誤:', error);
      alert('資料更新失敗，請重試');
    }
  };

  // 控制評論的換頁功能
  const [currentPageComments, setCurrentPageComments] = useState(1);
  const commentsPerPage = 10;
  
  const handlePageChangeComments = (page) => {
    setCurrentPageComments(page);
  };

  const getCommentsForPage = () => {
    const startIndex = (currentPageComments - 1) * commentsPerPage;
    return allComments.slice(startIndex, startIndex + commentsPerPage);
  };

  // 控制已預約日期的換頁功能
  const [currentPageReservations, setCurrentPageReservations] = useState(1);
  const reservationsPerPage = 10;
  
  const handlePageChangeReservations = (page) => {
    setCurrentPageReservations(page);
  };

  const getReservationsForPage = () => {
    const startIndex = (currentPageReservations - 1) * reservationsPerPage;
    return reservations.slice(startIndex, startIndex + reservationsPerPage);
  };

  // 顯示評論
  const renderComments = () => {
    const commentsToDisplay = getCommentsForPage();
    return (
      <div>
        {commentsToDisplay.map((comment, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {comment.text}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name={`rating-${index}`} // 讓每條評論的Rating有唯一名稱
                value={comment.rating}
                readOnly
                precision={1} // 僅支持整數評分
              />
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

  // 顯示已預約日期
  const renderReservations = () => {
    const reservationsToDisplay = getReservationsForPage();
    return (
      <div>
        {reservationsToDisplay.map((reservation, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              訂位日期: {reservation.date} {reservation.time} {reservation.peopleCount} 人
            </Typography>
          </Box>
        ))}
        {/* 頁碼控制 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => handlePageChangeReservations(currentPageReservations - 1)} 
            disabled={currentPageReservations === 1}
          >
            上一頁
          </Button>
          <Typography variant="body2" sx={{ mx: 2 }}>
            第 {currentPageReservations} 頁
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => handlePageChangeReservations(currentPageReservations + 1)} 
            disabled={currentPageReservations * reservationsPerPage >= reservations.length}
          >
            下一頁
          </Button>
        </Box>
      </div>
    );
  };

  // 顯示餐券管理
  const renderVouchers = () => {
    return <div>顯示餐券管理...</div>;
  };

  // 顯示更新資訊頁面
  const renderUpdateInfo = () => {
    return (
      <Box>
        <Typography variant="h6">更新店家資訊</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="店家名稱"
              variant="outlined"
              fullWidth
              value={editStoreData.name}
              name="name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="帳號"
              variant="outlined"
              fullWidth
              value={editStoreData.account}
              name="account"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="新密碼"
              variant="outlined"
              fullWidth
              type="password"
              value={editStoreData.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="確認密碼"
              variant="outlined"
              fullWidth
              type="password"
              value={editStoreData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              修改資訊
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 店家頭像和名稱區域 */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt={storeData.name} src={storeData.avatar} sx={{ width: 120, height: 120 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{storeData.name}</Typography>
          <Typography variant="body1">評論數量: {storeData.reviewsCount}</Typography>
          <Typography variant="body1">珍藏數量: {storeData.favoritesCount}</Typography>
          
          {/* 星星評價顯示 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating
              name="store-rating"
              value={storeData.averageRating} // 根據平均評分顯示星星
              readOnly
              precision={0.1} // 精確到 0.1 顆星
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {storeData.averageRating} / 5
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 按鈕區域 */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={() => setActiveTab("comments")} sx={{ mr: 2 }}>所有評論</Button>
        <Button variant="contained" onClick={() => setActiveTab("reservations")} sx={{ mr: 2 }}>已預約日期</Button>
        <Button variant="contained" onClick={() => setActiveTab("vouchers")} sx={{ mr: 2 }}>餐券管理</Button>
        <Button variant="contained" onClick={() => setActiveTab("updateInfo")}>更新資訊</Button>
      </Box>

      {/* 顯示不同內容區域 */}
      <Paper sx={{ mt: 3, p: 2 }}>
        {activeTab === "comments" && renderComments()}
        {activeTab === "reservations" && renderReservations()}
        {activeTab === "vouchers" && renderVouchers()}
        {activeTab === "updateInfo" && renderUpdateInfo()}
      </Paper>
    </Box>
  );
};

export default StoreLoginPage;
