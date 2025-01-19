// src/components/Reservations.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom"; // 引入 Link 用來導向餐廳頁面

const Reservations = () => {
  const reservations = [
    {
      id: 1,
      restaurant: "餐廳 A",
      date: "2025-01-15 18:00",
      address: "台北市信義區松高路"
    },
    {
      id: 2,
      restaurant: "餐廳 B",
      date: "2025-02-20 19:30",
      address: "台北市大安區忠孝東路"
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的訂位
      </Typography>

      {/* 使用 Grid 排版每條預定訊息 */}
      <Grid container spacing={2}>
        {reservations.map((reservation) => (
          <Grid item xs={12} key={reservation.id}>
            <Paper sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', // 訊息靠左顯示
              boxShadow: 2,
              borderRadius: 2
            }}>
              {/* 餐廳名稱，使用 Link 進行路由跳轉 */}
              <Link to={`/store/${reservation.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="primary" sx={{ marginBottom: 1 }}>
                  {reservation.restaurant}
                </Typography>
              </Link>

              {/* 預定時間 */}
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                <strong>預定時間：</strong> {reservation.date}
              </Typography>

              {/* 地址 */}
              <Typography variant="body2" color="text.secondary">
                <strong>地址：</strong> {reservation.address}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reservations;
