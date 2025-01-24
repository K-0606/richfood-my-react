import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// 模擬的用戶資料
const users = [
  { email: "brad@example.com", name: "Brad", account: "brad", password: "oldPassword" },
  { email: "kevin@example.com", name: "Kevin", account: "kevin", password: "oldPassword" },
  { email: "john@example.com", name: "John", account: "john", password: "oldPassword" },
];

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [tokenValid, setTokenValid] = useState(true); // 假設 token 有效
  const [userEmail, setUserEmail] = useState(""); // 用來存儲重設密碼的用戶 email

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    // 模擬驗證 token 是否有效
    const checkToken = async () => {
      // 假設 token 是有效的，這裡可以設定有效時間或生成的 token
      if (token === "valid-token") {
        setTokenValid(true);
      } else {
        setTokenValid(false);
      }
    };

    if (token) {
      checkToken();
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newPassword || newPassword !== confirmPassword) {
      setError("密碼不匹配或未輸入");
      return;
    }

    // 查找對應 email 的帳號
    const userIndex = users.findIndex((user) => user.email === userEmail);

    if (userIndex !== -1) {
      // 更新該帳號的密碼
      users[userIndex].password = newPassword;

      console.log("更新後的用戶資料:", users[userIndex]);
      setSuccessMessage(`密碼已成功更新！`);

      // 模擬跳轉回登入頁面
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setError("找不到對應的用戶");
    }
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  if (!tokenValid) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            重設密碼
          </Typography>
          <Alert severity="error">無效的或過期的重設密碼鏈接</Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          重設密碼
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <form onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={userEmail}
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="新密碼"
            type="password"
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="確認密碼"
            type="password"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            確認新密碼
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
