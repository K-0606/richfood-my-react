import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

const StoreCoupons = () => {
  const [coupons, setCoupons] = useState([
    // { id: 1, code: 'ABC123', status: '未使用' },
    // { id: 2, code: 'DEF456', status: '未使用' },
  ]);

  useEffect(()=>{
      const fetchCoupons=async ()=>{
        try{
          const response=await fetch('http://localhost:8080/couponsOrder/selectAllStoreCouponsOrder',
          { 
            method: 'GET',
            credentials: 'include', // 如果需要攜帶憑據（如 Cookies）
            headers: {
              'Content-Type': 'application/json',
            }
        });
          const data=await response.json();
          console.log(data);
  
          // 映射資料結構
          const formattedData=data.map((item)=>({
            id:item.orderId,
            code: item.orderId,
            status: item.status ? '未使用' : '已使用',
          })) 
  
          setCoupons(formattedData);
          console.log(formattedData)
        }catch(error){
          console.error(error);
        }
      }
      fetchCoupons();
      
  
    },[]);

  const handleScanSuccess = (scanResult) => {
    // 根據掃描結果更新餐券的狀態
    const updatedCoupons = coupons.map(coupon =>
      coupon.code === scanResult ? { ...coupon, status: '已使用' } : coupon
    );
    setCoupons(updatedCoupons);
    console.log('更新後的餐券資料:', updatedCoupons);

    // 這裡也可以調用 API 發送掃描結果到後端
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">餐券管理</Typography>

      {/* 顯示餐券列表 */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {coupons.map(coupon => (
          <Grid item xs={12} sm={6} key={coupon.id}>
            <Box sx={{ border: '1px solid #ccc', padding: 2 }}>
              <Typography variant="body1">餐券代碼: {coupon.code}</Typography>
              <Typography variant="body2" sx={{ color: coupon.status === '未使用' ? 'green' : 'red' }}>
                {coupon.status}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* QR Code 掃描器組件 */}
      {/* <StoreQRCodeScanner onScanSuccess={handleScanSuccess} /> */}
    </Box>
  );
};

export default StoreCoupons;
