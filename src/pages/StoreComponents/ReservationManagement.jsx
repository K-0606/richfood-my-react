import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

// 模擬的預約管理頁面
const ReservationManagement = () => {
  const [reservations, setReservations] = useState({});
  const [storeId, setStoreId] = useState(null); 

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

  // 抓取 storeId
  useEffect(() => {
    const fetchStoreId = async () => {
      try {
        const response = await fetch('http://localhost:8080/store/selectStore', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStoreId(data.storeId);
      } catch (error) {
        console.error('抓取錯誤:', error);
      }
    };

    fetchStoreId();
  }, []);



   // 使用 fetch 讀取餐廳的容量列表
   useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:8080/restaurantCapacity/getCapacityList',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        // setStoreId(data[0].storeId);
        
        // 將 API 返回的資料轉換為日期 -> 時段 -> 容量 的格式
        const transformedData = data.reduce((acc, item) => {
          const { date, time, maxCapacity } = item;
          
          if (!acc[date]) {
            acc[date] = {
              morning: 0,
              noon: 0,
              evening: 0,
            };
          }
          
          if (time === "早上") {
            acc[date].morning = maxCapacity;
          } else if (time === "中午") {
            acc[date].noon = maxCapacity;
          } else if (time === "晚上") {
            acc[date].evening = maxCapacity;
          }

          return acc;
        }, {});

        // 將轉換後的資料設定到 reservations 狀態中
        setReservations(transformedData);

      } catch (error) {
        console.error('抓取錯誤: ', error);
      }
    };
    fetchReservations();
  }, []);

  // 讀取已儲存的預約資料
  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('reservations'));
    if (savedReservations) {
      setReservations(savedReservations);
    } else {
      setReservations(getDefaultReservations()); // 沒有儲存資料時使用假定的值
    }
  }, []);

  // 使用 fetch 讀取餐廳的容量列表
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:8080/restaurantCapacity/getCapacityList');
        if (!response.ok) throw new Error('網路錯誤');
        const data = await response.json();
        // 假設返回的數據是以日期為鍵，並且每個日期內有 'morning', 'noon', 'evening'
        const fetchedReservations = data.reduce((acc, item) => {
          acc[item.date] = item.capacity; // 假設每個日期都有 capacity 記錄
          return acc;
        }, {});
        setReservations((prevReservations) => ({
          ...prevReservations,
          ...fetchedReservations, // 如果有 API 資料，覆蓋假定的值
        }));
      } catch (error) {
        console.error('抓取錯誤: ', error);
      }
    };
    fetchReservations();
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
    // 送出某天的數據到 API
    const submitReservation = async (day) => {
      const dayReservations = reservations[day];
      
  
      // 轉換成 API 所需的格式
      const postData = ['morning', 'noon', 'evening']
        .filter((timeSlot) => dayReservations[timeSlot]) // 過濾掉沒有輸入數據的時間段
        .map((timeSlot) => ({
          time: timeSlot === 'morning' ? '早上' : timeSlot === 'noon' ? '中午' : '晚上',
          maxCapacity: parseInt(dayReservations[timeSlot]),
          date: day,
          storeId:storeId

        }));
      
      
      
      try {
        for (const data of postData) {
          // Step 1: 發送 GET 請求檢查是否有相同時間的數據
          const response = await fetch('http://localhost:8080/restaurantCapacity/searchSameTime', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              storeId: storeId,
              time: data.time,
              date: data.date,
              }),
            });
      
          const result = await response.json(); // 假設回傳的是 true/false
          console.log(result);

          // Step 2: 根據結果發送不同的請求
          if (result === true) {
            // 如果存在數據，則更新
            const updateResponse = await fetch('http://localhost:8080/restaurantCapacity/searchAfterUpdate', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                storeId: data.storeId,     // 保證字段名稱和順序正確
                time: data.time,
                date: data.date,
                maxCapacity: data.maxCapacity,
              })
            });
      
            const updateResult = await updateResponse.json();
            console.log(updateResult);

            } else {
              // 如果不存在數據，則新增
            const addResponse = await fetch('http://localhost:8080/restaurantCapacity/addStoreCapacity', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            const addResult = await addResponse.json();
            console.log(`新增成功: ${addResult}`);
          }
        }
      } catch (error) {
          console.error('請求失敗', error);
        }
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
                  value={reservations[day]?.[timeSlot] || ''} // 使用從 API 或假定值獲得的值
                  onChange={(e) => handleInputChange(e, day, timeSlot)}
                />
              ))}
              <Typography variant="body1" sx={{ mt: 2 }}>
                總預約人數: <span className="total-count">{calculateDailyTotal(day)} 人</span>
              </Typography>
              <StyledButton 
                variant="contained" 
                onClick={() => submitReservation(day)}
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
})
