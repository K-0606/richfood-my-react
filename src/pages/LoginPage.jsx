// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Alert,
  Link,
} from "@mui/material";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // 引入 useUser

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser(); // 取得 login 方法
  const [isStore, setIsStore] = useState(false); // 判斷是會員還是店家
  const [account, setAccount] = useState(""); // 帳號輸入框的值
  const [password, setPassword] = useState(""); // 密碼輸入框的值
  const [error, setError] = useState(null); // 儲存錯誤訊息

  // 切換會員或店家登入模式
  const toggleUserType = (isStoreSelected) => {
    setIsStore(isStoreSelected);
    setError(null); // 清空錯誤訊息
  };

  // 提交會員登入表單
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      userAccount: account,
      password: password,
      userType: isStore ? "store" : "member",
    };
  
    try {
      // 1. 調用登入接口
      const response = await fetch("http://localhost:8080/User/Userlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
        credentials: "include", // 確保攜帶 Cookie
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "登入失敗");
      }
  
      const loginResult = await response.json();
      console.log("登入成功，獲取用戶 ID:", loginResult.userId);
  
      // 2. 調用 `/getUserDetails` 獲取用戶詳細資料
      const userDetailsResponse = await fetch("http://localhost:8080/User/getUserDetails", {
        method: "GET",
        credentials: "include", // 包含 cookie 以便後端識別 session
      });
  
      if (!userDetailsResponse.ok) {
        throw new Error("無法獲取用戶詳細資料");
      }
  
      const userDetails = await userDetailsResponse.json();
      // console.log("用戶詳細資料:", userDetails);
  
      // 3. 更新 Context 狀態
      login(userDetails); // 保存完整用戶資料到 Context
      navigate("/"); // 跳轉到首頁
    } catch (error) {
      setError(error.message);
      console.error("錯誤:", error.message);
    }
  };

  // 提交店家登入表單
  const handleStoreLogin = async (event) => {
    event.preventDefault();
    const requestData = { storeAccount: account, password: password };

    try {
      const response = await fetch("http://localhost:8080/store/storeLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "店家登入失敗");
      }

      const result = await response.json();
      login(result); // 更新 UserContext 狀態
      alert(`店家登入成功！店家 ID: ${result.storeId}`);
      navigate("/"); // 跳轉到首頁
    } catch (error) {
      setError(error.message);
      console.error("店家登入失敗：", error.message);
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            {isStore ? "店家登入" : "會員登入"}
          </Typography>
          <Grid container spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
              <Button
                variant={isStore ? "outlined" : "contained"}
                color="primary"
                onClick={() => toggleUserType(false)} // 切換到會員登入
              >
                會員登入
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={isStore ? "contained" : "outlined"}
                color="primary"
                onClick={() => toggleUserType(true)} // 切換到店家登入
              >
                店家登入
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={isStore ? handleStoreLogin : handleSubmit}
            sx={{ mt: 2 }}
          >
            <TextField
              label="帳號"
              type="text"
              fullWidth
              required
              value={account}
              onChange={(e) => setAccount(e.target.value)}
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              登入
            </Button>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/MemberRegister")}
                >
                  註冊會員
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/forgot-password")}
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
