import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MemberRegister = () => {
  // 表單的狀態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 處理註冊邏輯，這裡可以加入更多的驗證邏輯
    if (password !== confirmPassword) {
      alert("密碼和確認密碼不匹配！");
      return;
    }
    alert("註冊成功！");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        註冊帳號
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="密碼"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="確認密碼"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="電話"
              type="tel"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="出生年月日"
              type="date"
              variant="outlined"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              提交
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MemberRegister;