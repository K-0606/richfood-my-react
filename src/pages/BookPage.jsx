import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled component，不將 isDisabled 傳遞給 DOM 元素
const CardWrapper = styled(Card)(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.palette.grey[300] : theme.palette.background.paper,
  pointerEvents: disabled ? 'none' : 'auto',
  marginBottom: theme.spacing(2),
  borderRadius: '12px', // 卡片圓角
  boxShadow: disabled ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.1)', // 加入陰影
  transition: 'transform 0.3s ease', // 滑鼠懸停時動畫效果
  '&:hover': {
    transform: 'scale(1.05)', // 滑鼠懸停時放大
  },
}));

const BookPage = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(1); // 預設人數為 1
  const [maxSeats, setMaxSeats] = useState(1); // 最大可選座位數
  const [showSnackbar, setShowSnackbar] = useState(false); // 顯示提示訊息
  const navigate = useNavigate();

  useEffect(() => {
    // 生成今天和接下來五天的日期
    const getNextDays = () => {
      const days = [];
      const today = new Date();

      for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // 往後推i天
        const formattedDate = date.toLocaleDateString('zh-TW'); // 格式為 yyyy/mm/dd
        const dayOfWeek = date.toLocaleString('default', { weekday: 'long' }); // 星期幾

        days.push({
          date: formattedDate,
          day: dayOfWeek,
          morningSeats: Math.floor(Math.random() * 10), // 隨機生成座位數量
          noonSeats: Math.floor(Math.random() * 10),
          eveningSeats: Math.floor(Math.random() * 10),
        });
      }

      return days;
    };

    setData(getNextDays());
  }, []);

  const getButtonColor = (seats) => {
    if (seats === 0) return 'grey'; // 沒有座位可預訂
    return 'primary'; // 有座位
  };

  const handleBookClick = (date, timePeriod, seats) => {
    if (seats === 0) return; // 如果座位數為 0，則不能選擇

    // 設置當前選擇的日期和時間段
    setSelectedDate(date);
    setSelectedTime(timePeriod);
    setSelectedSeats(1); // 設置人數為 1（可以根據需求調整）
    setMaxSeats(seats); // 設置最大可選人數
    setOpenDialog(true); // 顯示對話框
  };

  const handleConfirmBooking = () => {
    // 確認人數不能超過最大剩餘座位數
    if (selectedSeats > maxSeats) {
      setShowSnackbar(true); // 顯示錯誤提示
      return;
    }

    // 在這裡可以將訂位資訊存儲到後端，現在先打印到 console
    console.log(`訂位資訊：
      餐廳: 測試餐廳
      日期: ${selectedDate}
      時間: ${selectedTime}
      人數: ${selectedSeats}`);

    // 關閉對話框並導回首頁
    setOpenDialog(false);
    navigate('/'); // 導回首頁
  };

  const handleCancelBooking = () => {
    setOpenDialog(false); // 關閉對話框
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false); // 關閉提示訊息
  };

  return (
    <>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardWrapper disabled={item.morningSeats === 0 && item.noonSeats === 0 && item.eveningSeats === 0}>
              <CardContent>
                <Typography variant="h6">{item.date} ({item.day})</Typography>
                <Grid container spacing={1}>
                  {['morningSeats', 'noonSeats', 'eveningSeats'].map((period, idx) => {
                    const periodLabel = period === 'morningSeats' ? '早上' : period === 'noonSeats' ? '中午' : '晚上';
                    return (
                      <Grid item xs={4} key={idx}>
                        <Typography variant="body2">{periodLabel}:</Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          color={getButtonColor(item[period])}
                          disabled={item[period] === 0}
                          onClick={() => handleBookClick(item.date, periodLabel, item[period])}
                        >
                          {item[period] === 0 ? '無座位' : `${item[period]} 位可預訂`}
ˇ                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>

      {/* 訂位確認對話框 */}
      <Dialog open={openDialog} onClose={handleCancelBooking}>
        <DialogTitle>確認訂位</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            是否確定訂位這個餐廳？
          </Typography>
          <Typography variant="body1">日期：{selectedDate}</Typography>
          <Typography variant="body1">時間：{selectedTime}</Typography>
          <Typography variant="body1">剩餘座位數：{maxSeats}</Typography>
          <Typography variant="body1">人數：
            <TextField
              type="number"
              value={selectedSeats}
              onChange={(e) => setSelectedSeats(Math.min(maxSeats, Math.max(1, e.target.value)))}
              inputProps={{ min: 1, max: maxSeats }}
              size="small"
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelBooking} color="primary">
            取消
          </Button>
          <Button onClick={handleConfirmBooking} color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>

      {/* 提示訊息 */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          預訂人數不能超過剩餘座位數！
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookPage;
