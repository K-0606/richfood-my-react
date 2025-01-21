import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Card, CardContent, CardActions } from '@mui/material';

// 假資料
const initialReservations = [
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "張三", title: "先生", reservationTime: "2025-01-15 12:00", peopleCount: 2, phone: "0987654321", status: "active" },
  { name: "李四", title: "小姐", reservationTime: "2025-01-16 18:00", peopleCount: 4, phone: "0912345678", status: "active" },
  { name: "王五", title: "先生", reservationTime: "2025-01-17 12:00", peopleCount: 6, phone: "0922334455", status: "active" },
  { name: "趙六", title: "小姐", reservationTime: "2025-01-18 18:00", peopleCount: 3, phone: "0933445566", status: "active" },
  { name: "張七", title: "先生", reservationTime: "2025-01-19 12:00", peopleCount: 2, phone: "0944556677", status: "active" },
  { name: "李八", title: "小姐", reservationTime: "2025-01-20 18:00", peopleCount: 5, phone: "0955667788", status: "active" },
  { name: "王九", title: "先生", reservationTime: "2025-01-21 12:00", peopleCount: 8, phone: "0966778899", status: "active" },
  { name: "趙十", title: "小姐", reservationTime: "2025-01-22 18:00", peopleCount: 4, phone: "0977889900", status: "active" },
  { name: "張十一", title: "先生", reservationTime: "2025-01-23 12:00", peopleCount: 3, phone: "0988990011", status: "active" },
  { name: "李十二", title: "小姐", reservationTime: "2025-01-24 18:00", peopleCount: 2, phone: "0999001122", status: "active" },
  { name: "王十三", title: "先生", reservationTime: "2025-01-25 12:00", peopleCount: 4, phone: "0900112233", status: "active" },
  { name: "趙十四", title: "小姐", reservationTime: "2025-01-26 18:00", peopleCount: 6, phone: "0911223344", status: "active" },
  { name: "張十五", title: "先生", reservationTime: "2025-01-27 12:00", peopleCount: 5, phone: "0922334455", status: "active" },
  { name: "李十六", title: "小姐", reservationTime: "2025-01-28 18:00", peopleCount: 3, phone: "0933445566", status: "active" },
  { name: "王十七", title: "先生", reservationTime: "2025-01-29 12:00", peopleCount: 7, phone: "0944556677", status: "active" },
  
  // 未來訂單（新增的13筆數據）
  { name: "陳十八", title: "小姐", reservationTime: "2025-02-01 12:00", peopleCount: 3, phone: "0955667788", status: "active" },
  { name: "李十九", title: "先生", reservationTime: "2025-02-02 18:00", peopleCount: 5, phone: "0912345678", status: "active" },
  { name: "周二十", title: "小姐", reservationTime: "2025-02-03 12:00", peopleCount: 2, phone: "0922334455", status: "active" },
  { name: "黃二十一", title: "先生", reservationTime: "2025-02-04 18:00", peopleCount: 4, phone: "0933445566", status: "active" },
  { name: "吳二十二", title: "小姐", reservationTime: "2025-02-05 12:00", peopleCount: 6, phone: "0944556677", status: "active" },
  { name: "蔡二十三", title: "先生", reservationTime: "2025-02-06 18:00", peopleCount: 7, phone: "0955667788", status: "active" },
  { name: "宋二十四", title: "小姐", reservationTime: "2025-02-07 12:00", peopleCount: 5, phone: "0966778899", status: "active" },
  { name: "沈二十五", title: "先生", reservationTime: "2025-02-08 18:00", peopleCount: 4, phone: "0977889900", status: "active" },
  { name: "邱二十六", title: "小姐", reservationTime: "2025-02-09 12:00", peopleCount: 6, phone: "0988990011", status: "active" },
  { name: "馮二十七", title: "先生", reservationTime: "2025-02-10 18:00", peopleCount: 3, phone: "0999001122", status: "active" },
  { name: "彭二十八", title: "小姐", reservationTime: "2025-02-11 12:00", peopleCount: 4, phone: "0900112233", status: "active" },
  { name: "劉二十九", title: "先生", reservationTime: "2025-02-12 18:00", peopleCount: 2, phone: "0911223344", status: "active" },
  { name: "陶三十", title: "小姐", reservationTime: "2025-02-13 12:00", peopleCount: 3, phone: "0922334455", status: "active" },
];

const StoreReservations = () => {
  const [currentPageReservations, setCurrentPageReservations] = useState(1);
  const reservationsPerPage = 10;
  const [openDialog, setOpenDialog] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [reservations, setReservations] = useState(initialReservations);
  const [tabValue, setTabValue] = useState(0); // 0: 過去訂單, 1: 未來訂單

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPageReservations(1);  // 切換到頁籤時回到第一頁
  };

  const handlePageChangeReservations = (page) => {
    setCurrentPageReservations(page);
  };

  // 過濾過去訂單
  const filterPastReservations = () => {
    const today = new Date();
    return reservations.filter((reservation) => new Date(reservation.reservationTime) < today);
  };

  // 過濾未來訂單
  const filterFutureReservations = () => {
    const today = new Date();
    return reservations.filter((reservation) => new Date(reservation.reservationTime) >= today);
  };

  // 根據頁籤選擇過濾過的訂單資料
  const filteredReservations = useMemo(() => {
    if (tabValue === 0) {
      return filterPastReservations(); // 過去訂單
    } else {
      return filterFutureReservations(); // 未來訂單
    }
  }, [tabValue, reservations]);

  // 根據過濾後的資料來獲取當前頁面的訂單
  const getReservationsForPage = () => {
    const startIndex = (currentPageReservations - 1) * reservationsPerPage;
    return filteredReservations.slice(startIndex, startIndex + reservationsPerPage);
  };

  // 計算總頁數
  const getTotalPages = () => {
    return Math.ceil(filteredReservations.length / reservationsPerPage);
  };

  const handleCancelReservation = (reservation) => {
    setReservationToCancel(reservation);
    setOpenDialog(true);
  };

  const confirmCancelReservation = () => {
    if (reservationToCancel) {
      const updatedReservations = reservations.filter(
        (reservation) => reservation !== reservationToCancel
      );
      setReservations(updatedReservations);
    }
    setOpenDialog(false);
    setReservationToCancel(null);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 800, margin: '0 auto', mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="過去訂單" sx={{ fontSize: '16px' }} />
            <Tab label="未來訂單" sx={{ fontSize: '16px' }} />
          </Tabs>

          {tabValue === 0 && (
            <div>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#1976d2' }}>
                過去訂單
              </Typography>
              {getReservationsForPage().map((reservation, index) => (
                <Card
                  sx={{
                    mb: 2,
                    boxShadow: 2,
                    borderRadius: 1,
                    p: 1.5,  // 缩小了卡片内边距
                    '&:hover': {
                      boxShadow: 6,  // 增加 hover 时的阴影
                      transform: 'scale(1.03)',  // 略微放大
                      transition: 'all 0.3s ease',  // 平滑过渡效果
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

          {tabValue === 1 && (
            <div>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#1976d2' }}>
                未來訂單
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
                    <Button variant="contained" color="error" onClick={() => handleCancelReservation(reservation)}>
                      取消訂單
                    </Button>
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
          <Button onClick={confirmCancelReservation} color="error">確認取消</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StoreReservations;