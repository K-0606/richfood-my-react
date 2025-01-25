import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // 假設有一個模擬的用戶資料列表
  // 模擬的用戶資料
const users = [
    { email: "brad@example.com", name: "Brad", account: "brad", password: "oldPassword" },
    { email: "kevin@example.com", name: "Kevin", account: "kevin", password: "oldPassword" },
    { email: "john@example.com", name: "John", account: "john", password: "oldPassword" },
  ];
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!account) {
      setError("請輸入帳號");
      return;
    }

    // 模擬檢查 email 是否存在
    const user = users.find((user) => user.email === account);

    if (user) {
      // 模擬發送重設密碼郵件
      setTimeout(() => {
        setSuccessMessage("重設密碼的連結已發送至您的電子郵件！");
        setError(null);
        
        // 這裡可以模擬等待幾秒鐘後跳轉回登入頁面
        setTimeout(() => navigate("/login"), 3000);
      }, 1000);
    } else {
      setError("找不到該 email，請確認後再試");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          忘記密碼
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <form onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="帳號或電子郵件"
            type="text"
            fullWidth
            required
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            發送重設密碼email
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
