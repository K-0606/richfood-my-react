import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Grid, Alert } from '@mui/material';
import Header from '../components/layout/Header';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();  // 用於跳轉頁面
  
  // 記錄當前用戶類型，店家或會員
  const [isStore, setIsStore] = useState(false);
  
  // 表單欄位狀態
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // 用來顯示錯誤訊息

  // 切換會員/店家登入
  const toggleUserType = (isStoreSelected) => {
    setIsStore(isStoreSelected);
  };
  
  
  // 提交表單處理函數
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 這裡設置帳號和密碼驗證邏輯
    const correctAccount = 'john';
    const correctPassword = '123456';

    if (account === correctAccount && password === correctPassword) {
      // 登入成功，儲存用戶資料
      const userData = {
        userId: '12345',
        userType: isStore ? 'store' : 'member',
        name: 'John Doe',  // 假資料
        avatar: 'https://example.com/avatar.jpg',  // 假資料
      };

      localStorage.setItem('user', JSON.stringify(userData));
      alert(`登入成功！用戶 ID: ${userData.userId}, 類型: ${userData.userType}`);
      navigate('/');  // 登入成功後跳轉到首頁
    } else {
      // 登入失敗，顯示錯誤訊息
      setError('帳號或密碼錯誤');
      setAccount('');  // 清空帳號欄位
      setPassword('');  // 清空密碼欄位
    }
  };

  return (
    <>
    <Header />
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
          {/* 帳號輸入欄位 */}
          <TextField
            label="帳號"
            type="text"
            fullWidth
            required
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            sx={{ mb: 2 }}
          />

            {/* 密碼輸入欄位 */}
            <TextField
              label="密碼"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />

            {/* 登入按鈕 */}
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
