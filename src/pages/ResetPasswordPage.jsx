import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newPassword || newPassword !== confirmPassword) {
      setError("密碼不匹配或未輸入");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/User/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage("密碼已成功重置，正在跳轉到登入頁面...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        const data = await response.json();
        setError(data.message || "密碼重置失敗");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("伺服器錯誤，請稍後再試！");
    }
  };

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
