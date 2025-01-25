import React, { useState, useEffect }  from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';  // 引入 axios 库來發送 HTTP 請求

const Coupons = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null); // 儲存選中的餐券
  const [coupons, setCoupons] = useState([
    // { id: 1, name: '餐券A', restaurant: '餐廳A', couponCode: 'A12345', used: false },
    // { id: 2, name: '餐券B', restaurant: '餐廳B', couponCode: 'B12345', used: true },
    // { id: 3, name: '餐券C', restaurant: '餐廳C', couponCode: 'C12345', used: false }
  ]);
  const [showQRCode, setShowQRCode] = useState(false); // 控制 QR code 顯示與否

  useEffect(() => {
      const fetchCoupons = async () => {
        try {
          const url ='http://localhost:8080/couponsOrder/selectAllCouponsOrder'
    
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
    
          const formattedData = data.map((item) => ({
            id:item.orderId, 
            name:`${item.coupons.name}\n${item.coupons.description}`, 
            restaurant:item.store.restaurants.name, 
            couponCode:`http://localhost:8080/couponsOrder/usedCoupon?orderId=${item.orderId}`, 
            used: item.status ,

          }));
          setCoupons(formattedData);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      };
    
      fetchCoupons();
    }, []);

  // 處理選擇餐券
  const handleSelectCoupon = (coupon) => {
    if (coupon.used) {
      setSelectedCoupon(coupon); // 顯示選中的餐券詳細資訊
      setShowQRCode(true); // 顯示 QR code
    }
  };

  // 處理完成按鈕，發送更新請求到後端
  const handleComplete = async () => {
    
      try {
        // 假設後端有個 API 用來更新餐券狀態
        const url =`http://localhost:8080/couponsOrder/usedCoupon?orderId=${selectedCoupon.id}`;


        const response = await axios.get(url, {}, { 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // 更新本地餐券狀態
        setCoupons(coupons.map(coupon =>
          coupon.id === selectedCoupon.id
            ? { ...coupon, used: false }  // 將選中的餐券標記為已使用
            : coupon
          ));
          alert('餐券已成功使用');
        
      } catch (error) {
        console.error('更新餐券狀態失敗:', error);
        alert('更新餐券狀態失敗，請稍後再試');
      }
    
  };

  // 隱藏 QR code
  const handleCloseQRCode = () => {
    setShowQRCode(false); // 隱藏 QR code
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>我的餐券</Typography>

      <Grid container spacing={2}>
        {/* 顯示餐券列表 */}
        {coupons.map((coupon) => (
          <Grid item xs={12} sm={4} key={coupon.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{coupon.restaurant}</Typography>
                <Typography variant="body2">{coupon.name}</Typography>
                <Typography variant="body2">
                  {coupon.used ? '可使用' : '已使用'}
                </Typography>
                {/* 如果餐券未使用，可以點擊查看詳情 */}
                {coupon.used ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectCoupon(coupon)}
                  >
                    查看詳情
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

      {/* 顯示選中的餐券詳情 */}
      {selectedCoupon && showQRCode && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">餐券詳情</Typography>
          <Typography variant="h6">餐廳：{selectedCoupon.restaurant}</Typography>
          <Typography variant="body2">餐券名稱：{selectedCoupon.name}</Typography>
          <Typography variant="body2">餐券代碼：{selectedCoupon.couponCode}</Typography>
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedCoupon.couponCode}&size=200x200`}
              alt="Coupon QR Code"
            />
          </Box>
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            {/* 完成按鈕，隱藏 QR Code 並更新狀態 */}
            <Button variant="contained" color="secondary" onClick={handleComplete}>
              完成
            </Button>
            <Button variant="outlined" color="default" onClick={handleCloseQRCode}>
              關閉
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Coupons;
