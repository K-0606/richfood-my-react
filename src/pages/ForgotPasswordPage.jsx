import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 使用 email，因为后端需要 email 参数
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("請輸入電子郵件");
      return;
    }

    try {
      // 向後端發送請求
      const response = await fetch("http://localhost:8080/User/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // 傳送 email 作為請求主體
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        throw new Error(errorData.message || "發送失敗");
      }

      // 請求成功，顯示成功訊息
      const data = await response.json();
      setSuccessMessage(data.message);
      setError(null);

      // 3 秒後跳轉到登入頁面
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
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
            label="電子郵件"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
