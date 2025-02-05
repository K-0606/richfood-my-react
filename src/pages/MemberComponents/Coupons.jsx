import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
// import axios from 'axios';  // 引入 axios 库來發送 HTTP 請求

const Coupons = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null); // 儲存選中的餐券
  const [coupons, setCoupons] = useState([
    { id: 1, name: '餐券A', restaurant: '餐廳A', couponCode: 'A12345', used: false, quantity: 5 },
    { id: 2, name: '餐券B', restaurant: '餐廳B', couponCode: 'B12345', used: false, quantity: 3 },
    { id: 3, name: '餐券C', restaurant: '餐廳C', couponCode: 'C12345', used: false, quantity: 0 }, // 沒有剩餘
    { id: 4, name: '餐券D', restaurant: '餐廳D', couponCode: 'D12345', used: false, quantity: 2 },
    { id: 5, name: '餐券E', restaurant: '餐廳E', couponCode: 'E12345', used: false, quantity: 1 },
  ]);
  const [showQRCode, setShowQRCode] = useState(false); // 控制 QR code 顯示與否
  const [countdown, setCountdown] = useState(null); // 控制倒數計時
  const [isConfirmed, setIsConfirmed] = useState(false); // 用來判斷是否已經確認使用餐券
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // 用來控制是否顯示確認提示框

  // useEffect(() => {
  //   const fetchCoupons = async () => {
  //     try {
  //       const url ='http://localhost:8080/couponsOrder/selectAllCouponsOrder'
  //       const response = await fetch(url, {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const data = await response.json();
  //       const formattedData = data.map((item) => ({
  //         id:item.orderId, 
  //         name:`${item.coupons.name}\n${item.coupons.description}`, 
  //         restaurant:item.store.restaurants.name, 
  //         couponCode:`http://localhost:8080/couponsOrder/usedCoupon?orderId=${item.orderId}`, 
  //         used: item.status,
  //         quantity: item.quantity, // 假設這裡有數量資訊
  //       }));
  //       setCoupons(formattedData);
  //     } catch (error) {
  //       console.error('Error fetching reservations:', error);
  //     }
  //   };

  //   fetchCoupons();
  // }, []);

  // 處理選擇餐券
  const handleSelectCoupon = (coupon) => {
    if (!coupon.used && coupon.quantity > 0) {
      setSelectedCoupon(coupon); // 顯示選中的餐券詳細資訊
      setShowConfirmationDialog(true); // 顯示確認提示框
      setShowQRCode(false); // 不顯示 QR code，直到用戶確認
      setIsConfirmed(false); // 初始化為未確認
    }
  };

  // 開始倒數計時
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleComplete(); // 十分鐘後自動完成使用
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setCountdown(600); // 設置初始倒數為10分鐘(600秒)
  };

  // 確認使用餐券
  const handleConfirmUse = () => {
    setIsConfirmed(true);
    setShowConfirmationDialog(false); // 隱藏確認提示框
    setShowQRCode(true); // 顯示 QR code
    startCountdown(); // 開始倒數計時
  };

  // 取消使用餐券
  const handleCancelUse = () => {
    setSelectedCoupon(null); // 清空選中的餐券
    setShowConfirmationDialog(false); // 隱藏確認提示框
  };

  // 處理完成按鈕，發送更新請求到後端
  const handleComplete = async () => {
    // 假設每次使用餐券後，數量會減少
    setCoupons(coupons.map(coupon =>
      coupon.id === selectedCoupon.id
        ? { ...coupon, quantity: coupon.quantity - 1 }  // 減少剩餘數量
        : coupon
    ));

    // 如果餐券數量為零，則隱藏該餐券
    if (selectedCoupon.quantity - 1 === 0) {
      setCoupons(coupons.filter(coupon => coupon.id !== selectedCoupon.id));
    }

    // alert('餐券已成功使用');
    setShowQRCode(false);  // 隱藏 QR code
    setSelectedCoupon(null); // 清空選中的餐券
    setIsConfirmed(false); // 重置確認狀態
  };

  // 隱藏 QR code
  const handleCloseQRCode = () => {
    setShowQRCode(false); // 隱藏 QR code
    setSelectedCoupon(null); // 清空選中的餐券
    setIsConfirmed(false); // 重置確認狀態
    setCountdown(null); // 重置倒數計時
  };

  // 只顯示剩餘數量大於零的餐券
  const availableCoupons = coupons.filter(coupon => coupon.quantity > 0);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>我的餐券</Typography>

      {availableCoupons.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="textSecondary">現在沒商品，來去逛逛</Typography>
          <Button variant="contained" color="primary" href="/">回首頁</Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* 顯示餐券列表 */}
          {availableCoupons.map((coupon) => (
            <Grid item xs={12} sm={4} key={coupon.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{coupon.restaurant}</Typography>
                  <Typography variant="body2">{coupon.name}</Typography>
                  <Typography variant="body2">
                    剩餘數量：{coupon.quantity}
                  </Typography>
                  {/* 如果餐券未使用且剩餘數量大於 0，可以點擊查看詳情 */}
                  {!coupon.used && coupon.quantity > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectCoupon(coupon)}
                    >
                      使用餐券
                    </Button>
                  ) : (
                    <Button variant="contained" disabled>
                      已使用
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* 顯示選中的餐券詳情 */}
      {selectedCoupon && showQRCode && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">餐券詳情</Typography>
          <Typography variant="h6">餐廳：{selectedCoupon.restaurant}</Typography>
          <Typography variant="body2">餐券名稱：{selectedCoupon.name}</Typography>
          <Typography variant="body2">餐券代碼：{selectedCoupon.couponCode}</Typography>
          
          {isConfirmed ? (
            countdown > 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                倒數時間：{Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60} (剩餘)
              </Typography>
            )
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleConfirmUse}>
                確定使用餐券
              </Button>
            </Box>
          )}

          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedCoupon.couponCode}&size=200x200`}
              alt="Coupon QR Code"
            />
          </Box>
          
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Button variant="outlined" color="default" onClick={handleCloseQRCode}>
              關閉
            </Button>
          </Box>
        </Box>
      )}

      {/* 確認使用餐券提示框 */}
      {showConfirmationDialog && (
        <Box sx={{ padding: 3, textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 2, color: 'white' }}>
          <Typography variant="h6">確定使用餐券嗎？</Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            QR-Code需在十分鐘內使用完畢。
          </Typography>
          <Button variant="contained" color="primary" onClick={handleConfirmUse}>確定</Button>
          <Button variant="outlined" color="secondary" onClick={handleCancelUse} sx={{ marginLeft: 2 }}>
            取消
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Coupons;
