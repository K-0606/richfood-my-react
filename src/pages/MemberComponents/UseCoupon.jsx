// src/MemberComponents/UseCoupon.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';  // 引入 useParams 和 useNavigate

const UseCoupon = () => {
  const { couponId } = useParams(); // 使用 useParams 獲取 URL 中的餐券 ID
  const navigate = useNavigate(); // 用來進行頁面跳轉

  const [coupon, setCoupon] = useState(null); // 儲存餐券資料
  const [isUsed, setIsUsed] = useState(false); // 標記餐券是否已使用
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar 控制
  const [snackMessage, setSnackMessage] = useState(''); // Snackbar 顯示訊息

  // 假設有餐券的資料，實際情況中可以從後端獲取
  const coupons = [
    { id: 1, name: '餐券A', restaurant: '餐廳A', couponCode: 'A12345', used: false },
    { id: 2, name: '餐券B', restaurant: '餐廳B', couponCode: 'B12345', used: true }, // 已使用
    { id: 3, name: '餐券C', restaurant: '餐廳C', couponCode: 'C12345', used: false }
  ];

  // 模擬根據 couponId 查找對應餐券資料
  useEffect(() => {
    const foundCoupon = coupons.find((c) => c.id === parseInt(couponId));
    if (foundCoupon) {
      setCoupon(foundCoupon);
      setIsUsed(foundCoupon.used); // 根據資料設置是否已使用
    }
  }, [couponId]);

  // 如果沒有找到餐券，就顯示錯誤訊息
  if (!coupon) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error">無效的餐券ID</Typography>
      </Box>
    );
  }

  // 當餐券無法使用時顯示提示
  const handleUseCoupon = () => {
    if (isUsed) {
      setSnackMessage('此餐券已經使用過！');
      setOpenSnackbar(true); // 顯示已經使用過的提示
      return;
    }

    // 顯示餐券已可使用的提示
    setSnackMessage('餐券已成功激活，可以使用！');
    setOpenSnackbar(true);
  };

  // 點擊完成，更新餐券狀態並返回餐券頁面
  const handleComplete = () => {
    // 更新餐券為已使用
    setIsUsed(true);
    setSnackMessage('餐券已成功使用！');
    setOpenSnackbar(true);
    // 跳轉回餐券頁面
    navigate('/coupons');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>使用餐券</Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">餐廳：{coupon.restaurant}</Typography>
          <Typography variant="body2">餐券名稱：{coupon.name}</Typography>
          <Typography variant="body2">餐券代碼：{coupon.couponCode}</Typography>

          {/* 顯示 Qr Code 或條碼 */}
          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            {/* 只有餐券未使用時才顯示 Qr Code */}
            {!isUsed && (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${coupon.couponCode}&size=200x200`}
                alt="Coupon QR Code"
              />
            )}
          </Box>

          {/* 按鈕來使用餐券 */}
          <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUseCoupon}
              disabled={isUsed} // 如果餐券已經使用過，禁用按鈕
            >
              {isUsed ? '餐券已使用' : '使用餐券'}
            </Button>
          </Box>

          {/* 完成按鈕，只有在餐券可用的時候才顯示 */}
          {!isUsed && (
            <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleComplete}
              >
                完成
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* 顯示 Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackMessage}
      />
    </Box>
  );
};

export default UseCoupon;
