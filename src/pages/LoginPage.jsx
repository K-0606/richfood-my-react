import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Grid, Alert, Link } from '@mui/material';
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
      console.log('切換登入模式:', isStoreSelected ? '店家登入' : '會員登入');
      setIsStore(isStoreSelected);
    };
  
  // 店家登入處理函數
  const handleStoreLogin = async (event) => {
    event.preventDefault();
    const requestData = {
      storeAccount: account,
      password: password,
      };

    try {
      const response = await fetch('http://localhost:8080/store/storeLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        credentials: 'include', // 確保攜帶 Cookie
        body: JSON.stringify(requestData),
      });
      console.log('發送的請求資料：', requestData);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '店家登入失敗');
      }
  
        const result = await response.json();
        console.log(result)
        alert(`店家登入成功！店家 ID: ${result.storeId}`);
      } catch (error) {
        console.error('店家登入失敗：', error.message);
        alert(`店家登入失敗：${error.message}`);
      }
    };

     // 提交表單處理函數
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      userAccount: account,
      password: password,
      userType: isStore ? 'store' : 'member', // 根據 isStore 判斷用戶類型
    
  };

  try {
    const response = await fetch('http://localhost:8080/User/Userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      credentials: 'include', // 確保攜帶 Cookie

      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '登入失敗');
    }

    const result = await response.json();
    alert(`登入成功！用戶 ID: ${result.userId}, 類型: ${result.userType}`);
  } catch (error) {
    console.error('登入失敗：', error.message);
    alert(`登入失敗：${error.message}`);
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

          {/* 顯示錯誤訊息 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={isStore ? handleStoreLogin :handleSubmit} sx={{ mt: 2 }}>
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

            {/* 註冊會員和忘記密碼的連結 */}
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/MemberRegister')}  // 假設註冊頁面的路由是 "/register"
                >
                  註冊會員
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/forgot-password')}  // 假設忘記密碼頁面的路由是 "/forgot-password"
                >
                  忘記密碼
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;