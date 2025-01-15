import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MemberRegister = () => {
  // 表單的狀態管理
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [showPassword, setShowPassword] = useState(false);

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 檢查密碼是否匹配
    if (password !== confirmPassword) {
      alert("密碼和確認密碼不匹配！");
      return;
    }

    // 檢查Email格式
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("請輸入有效的Email！");
      return;
    }

    // 檢查電話格式
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("電話號碼格式不正確！請輸入10位數字。");
      return;
    }

    // 構建 FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userAccount", account);
    formData.append("password", password);
    formData.append("tel", phone);
    formData.append("email", email);
    formData.append("birthday", dob);
    formData.append("gender", gender);

    try {
      const response = await fetch("http://localhost:8080/User/register", {
        method: "POST",
        body: formData, // 傳遞 FormData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "註冊失敗");
      }
  
      const result = await response.json();
      alert("註冊成功！");

      // 清空表單
      setAccount("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setPhone("");
      setDob("");
      setName("");
      setGender("male");
    } catch (error) {
      console.error("註冊失敗:", error.message);
      alert(`註冊失敗：${error.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        註冊帳號
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* 姓名欄位 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="姓名"
              type="text"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>

          {/* 帳號欄位 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="帳號"
              type="text"
              variant="outlined"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </Grid>

          {/* 密碼欄位 */}
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

          {/* 確認密碼欄位 */}
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

          {/* Email欄位 */}
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

          {/* 電話欄位 */}
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

          {/* 性別欄位 */}
          <Grid item xs={12}>
            <FormControl component="fieldset" required>
              <FormLabel component="legend">性別</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio />} label="男" />
                <FormControlLabel value="female" control={<Radio />} label="女" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* 出生年月日欄位 */}
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

          {/* 註冊按鈕 */}
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              註冊
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MemberRegister;