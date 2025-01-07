// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Grid } from '@mui/material';
import Header from '../components/layout/Header';

const LoginPage = () => {
  // 記錄當前用戶類型，店家或會員
  const [isStore, setIsStore] = useState(false);
  
  // 表單欄位狀態
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 提交表單處理函數
  const handleSubmit = (event) => {
    event.preventDefault();
    // 這裡可以處理 API 請求，傳送 email 和 password
    console.log(`Email: ${email}, 密碼: ${password}, 用戶類型: ${isStore ? '店家' : '會員'}`);
  };

  // 切換會員/店家登入
  const toggleUserType = (isStoreSelected) => {
    setIsStore(isStoreSelected);
  };

  return (
    <>
    <Header/>
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          {isStore ? '店家登入' : '會員登入'}
        </Typography>
         {/* 顯示切換登入模式的按鈕 */}
         <Grid container spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
              <Button
                variant={isStore ? 'outlined' : 'contained'}
                color="primary"
                onClick={() => toggleUserType(false)} // 切換到會員登入
              >
                會員登入
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={isStore ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => toggleUserType(true)} // 切換到店家登入
              >
                店家登入
              </Button>
            </Grid>
          </Grid>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="密碼"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

         

          {/* 登入按鈕獨立在最下面 */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            登入
          </Button>
        </Box>
      </Paper>
    </Container>
    </>
  );
};

export default LoginPage;
