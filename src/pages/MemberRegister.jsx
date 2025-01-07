import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';


const MemberRegister = () => {
    // 註冊頁面的狀態管理
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  // 更新表單資料
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 提交表單資料
  const handleSubmit = () => {
    // 簡單檢查信用卡格式
    if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) {
      alert("請填寫所有信用卡資料！");
      return;
    }

    console.log('提交資料:', formData);
    // 這裡可以做一些資料驗證或API調用
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          會員註冊
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="姓名"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="聯絡電話"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="生日"
              variant="outlined"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="地址"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>

          {/* 新增信用卡欄位 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="信用卡號"
              variant="outlined"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              inputProps={{ maxLength: 19 }} // 限制最大長度
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="有效期限 (MM/YY)"
              variant="outlined"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              inputProps={{ maxLength: 5 }} // 格式 MM/YY
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              variant="outlined"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              inputProps={{ maxLength: 3 }} // CVV 最多 3 位數
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              確認資料
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
    
export default MemberRegister;