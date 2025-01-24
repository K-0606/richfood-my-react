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
  const { login } = useUser(); // 使用 useUser hook
  const [isStore, setIsStore] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const toggleUserType = (isStoreSelected) => {
    setIsStore(isStoreSelected);
  };

  // 硬編碼的帳號密碼資料，這些資料會用來測試
  const testUsers = {
    member: [
      {
        account: "brad",
        password: "1234567",
        name: "Brad",
        userId: 1,
        userType: "member",
      },
      {
        account: "kevin",
        password: "1234567",
        name: "Kevin",
        userId: 2,
        userType: "member",
      },
      {
        account: "john",
        password: "1234567",
        name: "John",
        userId: 3,
        userType: "member",
      },
    ],
    store: [
      {
        storeAccount: "store1",
        password: "123456",
        name: "Store 1",
        storeId: 101,
        userType: "store",
      },
      {
        storeAccount: "store2",
        password: "123456",
        name: "Store 2",
        storeId: 102,
        userType: "store",
      },
    ],
  };

  // 會員登入邏輯（硬編碼）
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      userAccount: account,
      password: password,
      userType: isStore ? "store" : "member",  // 這裡設置的是 userType
    };
  
    // 測試資料：根據用戶類型檢查登入
    let user = null;
    if (isStore) {
      // 模擬店家登入
      user = testUsers.store.find(
        (store) => store.storeAccount === account && store.password === password
      );
    } else {
      // 模擬會員登入
      user = testUsers.member.find(
        (member) => member.account === account && member.password === password
      );
    }
  
    if (user) {
      // 這裡修改，將 userType 改為 type
      user.type = user.userType;  // 確保傳遞的是 'type' 屬性
      login(user); // 登入成功後，更新 UserContext 和 localStorage
      alert(
        `${isStore ? "店家" : "會員"}登入成功！${
          isStore ? "店家 ID" : "用戶 ID"
        }: ${user.userId}`
      );
      navigate("/"); // 登入後跳轉到首頁
    } else {
      setError("帳號或密碼錯誤");
      console.error("登入失敗：帳號或密碼錯誤");
    }
  };

  // 店家登入邏輯（硬編碼）
  const handleStoreLogin = async (event) => {
    event.preventDefault();
    const requestData = { storeAccount: account, password: password };

    // 測試資料：模擬店家登入
    const store = testUsers.store.find(
      (store) => store.storeAccount === account && store.password === password
    );

    if (store) {
      login(store); // 登入成功後，更新 UserContext 和 localStorage
      alert(`店家登入成功！店家 ID: ${store.storeId}`);
      navigate("/"); // 登入後跳轉到首頁
    } else {
      setError("帳號或密碼錯誤");
      console.error("店家登入失敗：帳號或密碼錯誤");
    }
  };
  // 原本連接資料庫的部分
  // const response = await fetch('http://localhost:8080/User/Userlogin', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   credentials: 'include',
  //   body: JSON.stringify(requestData),
  // });
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            {isStore ? "店家登入" : "會員登入"}
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
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
