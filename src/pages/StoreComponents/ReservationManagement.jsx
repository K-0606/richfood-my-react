import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

// 模擬的預約管理頁面
const ReservationManagement = () => {
  const [reservations, setReservations] = useState({});
  
  // 計算7天的日期
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]); // yyyy-mm-dd 格式
    }
    return days;
  };

  // 讀取已儲存的預約資料
  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('reservations'));
    if (savedReservations) {
      setReservations(savedReservations);
    }
  }, []);

  // 儲存資料到 localStorage
  const saveReservations = (day) => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
    alert(`${day} 的預約設定已儲存！`);
  };

  // 計算每日的總預約人數
  const calculateDailyTotal = (day) => {
    const dayReservations = reservations[day] || {};
    return ['morning', 'noon', 'evening'].reduce((total, slot) => {
      return total + (parseInt(dayReservations[slot] || 0) || 0);
    }, 0);
  };

  // 更新時段的可預約人數
  const handleInputChange = (e, day, timeSlot) => {
    const { value } = e.target;
    setReservations((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [timeSlot]: value,
      },
    }));
  };

  const days = getNextSevenDays();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>預約管理</Typography>

      <Grid container spacing={3}>
        {days.map((day) => (
          <Grid item xs={12} sm={4} key={day}>
            <StyledPaper>
              <Typography variant="h6" sx={{ mb: 2 }}>{day}</Typography>
              {['morning', 'noon', 'evening'].map((timeSlot) => (
                <StyledTextField
                  key={timeSlot}
                  label={`${timeSlot === 'morning' ? '早上' : timeSlot === 'noon' ? '中午' : '晚上'}可預約人數`}
                  type="number"
                  value={reservations[day]?.[timeSlot] || ''}
                  onChange={(e) => handleInputChange(e, day, timeSlot)}
                />
              ))}
              <Typography variant="body1" sx={{ mt: 2 }}>
                總預約人數: <span className="total-count">{calculateDailyTotal(day)} 人</span>
              </Typography>
              <StyledButton 
                variant="contained" 
                onClick={() => saveReservations(day)}
              >
                確認設定
              </StyledButton>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReservationManagement;

// 使用 styled 來自定義 MUI 元素
const StyledPaper = styled(Paper)({
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)', // Hover效果
    transform: 'scale(1.02)', // 放大效果
  },
});

const StyledTextField = styled(TextField)({
  width: '100%',
  marginTop: '10px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
});

const StyledButton = styled(Button)({
  marginTop: '15px',
  width: '100%',
  borderRadius: '8px',
  padding: '10px 0',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#00796b', // 綠色背景
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
});
