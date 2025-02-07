import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Card, CardContent, CardActions } from '@mui/material';

const StoreReservations = () => {
  const [currentPageReservations, setCurrentPageReservations] = useState(1);
  const reservationsPerPage = 10;
  const [openDialog, setOpenDialog] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [pastReservations, setPastReservations] = useState([]); // 過去訂單資料
  const [futureReservations, setFutureReservations] = useState([]); // 未來訂單的假資料
  const [tabValue, setTabValue] = useState(0); // 0: 過去訂單, 1: 未來訂單
  const [today, setToday] = useState(() => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset(); // 取得當地與 UTC 的時間差（分鐘）
    const localTime = new Date(now.getTime() - localOffset * 60 * 1000); // 調整為當地時間
    return localTime.toISOString().split('T')[0]; // 取得 YYYY-MM-DD 格式
  });

  //設定當天時間
  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date().toISOString().split('T')[0]);
    }, 60 * 60 * 1000); // 每小時檢查一次
    console.log(today)
    return () => clearInterval(timer); // 組件卸載時清除定時器
  }, []);
  const getNextDay = (dateString) => {
    const date = new Date(dateString); // 將字串轉為 Date 物件
    date.setDate(date.getDate() + 1); // 日期加1
    return date.toISOString().split('T')[0]; // 回傳 YYYY-MM-DD 格式
  };

  // 當頁面加載時從後端獲取訂單資料
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const url = tabValue === 0
          ? 'http://localhost:8080/storeReservation/selectAllReservationAsc'
          : 'http://localhost:8080/storeReservation/selectAllReservationNotCancelAsc';
  
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
  
        const formattedData = data.map((item) => ({
          reservationId: item.reservationId,
          reservationDate: item.reservationDate, // 單獨存儲日期部分
          reservationTime: item.reservationDate + ' ' + item.reservationTime,
          peopleCount: item.numPeople,
          name: item.users.name,
          title: item.users.gender,
          phone: item.users.tel,
          status: item.state,
        }));
  
        // 根據 tabValue 設定對應的資料
        if (tabValue === 0) {
          setPastReservations(formattedData);
        } else {
          setFutureReservations(formattedData);
        }
  
        console.log(formattedData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
  
    fetchReservations();
  }, [tabValue]); // 每次 tabValue 改變時，重新抓取資料

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPageReservations(1); // 切換到頁籤時回到第一頁
  };

  const handlePageChangeReservations = (page) => {
    setCurrentPageReservations(page);
  };

  // 根據頁籤選擇顯示的資料
  const filteredReservations = tabValue === 0 ? pastReservations : futureReservations;

  // 根據頁面獲取訂單資料
  const getReservationsForPage = () => {
    const startIndex = (currentPageReservations - 1) * reservationsPerPage;
    return filteredReservations.slice(startIndex, startIndex + reservationsPerPage);
  };

  // 計算總頁數
  const getTotalPages = () => {
    return Math.ceil(filteredReservations.length / reservationsPerPage);
  };

  const handleCancelReservation =  (reservationId) => {
    console.log(reservationId)
    setReservationToCancel(reservationId);
    setOpenDialog(true);
  };

  const confirmCancelReservation = async () => {
    if (reservationToCancel) {
      try {
        const response = await fetch(`http://localhost:8080/storeReservation/updateSeat/${reservationToCancel}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state: false }), // 更新訂單狀態為 false
        });

        if (response.ok) {
          const updatedReservations = filteredReservations.filter(
            (reservation) => reservation.reservationId !== reservationToCancel
          );
          if (tabValue === 0) {
            setPastReservations(updatedReservations);
          } else {
            setFutureReservations(updatedReservations);
          }
        } else {
          console.error('Failed to cancel reservation:', response.statusText);
        }
      } catch (error) {
        console.error('Error cancelling reservation:', error);
      }
    }

    setOpenDialog(false);
    setReservationToCancel(null);
  };



  return (
    <div>
      <Card sx={{ maxWidth: 800, margin: '0 auto', mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="所有訂位" sx={{ fontSize: '16px' }} />
            <Tab label="未來訂位" sx={{ fontSize: '16px' }} />
          </Tabs>

          {/* 顯示過去訂單 */}
          {tabValue === 0 && (
            <div>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#1976d2' }}>
                所有訂位
              </Typography>
              {getReservationsForPage().map((reservation, index) => (
                <Card
                  sx={{
                    mb: 2,
                    boxShadow: 2,
                    borderRadius: 1,
                    p: 1.5,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.03)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                  key={index}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                      {reservation.name} {reservation.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                      訂位時間: {reservation.reservationTime}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                      人數: {reservation.peopleCount} 人
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                      電話: {reservation.phone}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* 顯示未來訂單 */}
          {tabValue === 1 && (
            <div>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#1976d2' }}>
                未來訂位
              </Typography>
              {getReservationsForPage().map((reservation, index) => (
                <Card
                  sx={{
                    mb: 2,
                    boxShadow: 2,
                    borderRadius: 1,
                    p: 1.5,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.03)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                  key={index}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                      {reservation.name} {reservation.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                      訂位時間: {reservation.reservationTime}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                      人數: {reservation.peopleCount} 人
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                      電話: {reservation.phone}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    {reservation.reservationDate !== today
                    &&
                    reservation.reservationDate !== getNextDay(today)
                    &&(
                    <Button variant="contained" color="error" onClick={() => handleCancelReservation(reservation.reservationId)}>
                      取消訂單
                    </Button>
                  )}
                  </CardActions>
                </Card>
              ))}
            </div>
          )}

          {/* 頁碼控制 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => handlePageChangeReservations(currentPageReservations - 1)}
              disabled={currentPageReservations === 1}
              sx={{ mr: 1 }}
            >
              上一頁
            </Button>
            <Typography variant="body2" sx={{ mx: 2 }}>
              第 {currentPageReservations} 頁 / {getTotalPages()} 頁
            </Typography>
            <Button
              variant="outlined"
              onClick={() => handlePageChangeReservations(currentPageReservations + 1)}
              disabled={currentPageReservations === getTotalPages()}
              sx={{ ml: 1 }}
            >
              下一頁
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 取消訂單對話框 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>確認取消訂單</DialogTitle>
        <DialogContent>
          <Typography variant="body2">您確定要取消這筆訂單嗎？</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>取消</Button>
          <Button onClick={confirmCancelReservation} color="error">
            確認取消
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StoreReservations;
