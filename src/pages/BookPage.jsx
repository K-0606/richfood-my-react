import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const { restaurantId } = location.state || {}; // 原來的 restaurantId 取得方式
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      fetch(`http://localhost:8080/restaurants/${restaurantId}`)
        .then(response => response.json())
        .then(data => {
          setStoreId(data.storeId);
        })
        .catch(error => console.error("Error fetching storeId:", error));
    }
  }, [restaurantId]);


  useEffect(() => {
    // 生成今天和接下來五天的日期
    const getNextDays = () => {
      const days = [];
      const today = new Date();
  
      for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // 往後推i天
        const formattedDate = date.toISOString().split('T')[0]; // 格式為 yyyy/mm/dd
        const dayOfWeek = date.toLocaleString('default', { weekday: 'long' }); // 星期幾
  
        days.push({
          date: formattedDate,
          day: dayOfWeek,
          morningSeats: 0, // 隨機生成座位數量
          noonSeats: 0,
          eveningSeats: 0,
        });
      }
  
      return days;
    };

    const fetchData = async () => {
      // const storeId = 1; // 固定storeId為1 // 已經在外部設定為固定值，不需要在這裡重新設置
      const daysData = getNextDays();
  
      try {
        const response = await fetch(`http://localhost:8080/restaurantCapacity/getMaxCapacity?storeId=${storeId}`);
        const result = await response.json();
        console.log(result);
  
        // 根據後端回應填充座位數
        result.forEach((item) => {
          const dayIndex = daysData.findIndex(day => day.date === item.date); // 查對應的日期
          if (dayIndex !== -1) {
            // 根據時間段設定座位數
            if (item.time === '早上') {
              daysData[dayIndex].morningSeats = item.maxCapacity;
            } else if (item.time === '中午') {
              daysData[dayIndex].noonSeats = item.maxCapacity;
            } else if (item.time === '晚上') {
              daysData[dayIndex].eveningSeats = item.maxCapacity;
            }
          }
        });
  
        setData(daysData); // 更新資料
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // 觸發資料抓取
  }, [storeId]); // 只有當 storeId 改變時觸發

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

  const handleConfirmBooking = async () => {
    // 確認人數不能超過最大剩餘座位數
    if (selectedSeats > maxSeats) {
      setShowSnackbar(true); // 顯示錯誤提示
      return;
    }

    const reservationData = {
      storeId: storeId, // 固定storeId ID
      reservationDate: selectedDate, // 預訂日期
      reservationTime: selectedTime, // 預訂時間段（早上/中午/晚上）
      numPeople: selectedSeats, // 預訂人數
    };

    try {
      const response = await fetch('http://localhost:8080/reservation/addseat', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData), // 將資料轉換成 JSON 格式
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Reservation successful:', result);

        // 顯示成功提示或執行其他操作
        alert('預訂成功！');
        setOpenDialog(false); // 關閉對話框
        navigate('/'); // 導回首頁
      } else {
        console.error('Reservation failed:', response.statusText);
        alert('預訂失敗，請稍後再試！');
      }
    } catch (error) {
      console.error('Error during reservation:', error);
    }

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
                        </Button>
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
