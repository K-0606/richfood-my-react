// src/pages/MemberComponents/MemberProfile.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const MemberProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [memberData, setMemberData] = useState({
    id: '12345',
    name: 'Rich Food',
    gender: 'Male',
    email: 'richfood@example.com',
    password: '',
    confirmPassword: '',
    avatarUrl: 'https://megapx-assets.dcard.tw/images/7d91a6c1-e79c-4f43-a57e-66670e71fca2/1280.webp', // 預設頭像
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // 這裡可以放保存的邏輯
    console.log('Saved Member Data: ', memberData);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberData((prevData) => ({
          ...prevData,
          avatarUrl: reader.result, // 更新頭像URL為選擇的圖片
        }));
      };
      reader.readAsDataURL(file); // 將圖片轉為Base64格式
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>會員資料</Typography>

      <Grid container spacing={2}>
        
        {/* 其他會員資料欄位 */}
        <Grid item xs={12} sm={8}>
          <TextField
            label="會員 ID"
            value={memberData.id}
            fullWidth
            disabled
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="會員姓名"
            value={memberData.name}
            onChange={handleInputChange}
            name="name"
            fullWidth
            variant="outlined"
            disabled={!isEditing}
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth disabled={!isEditing} sx={{ marginBottom: 2 }}>
            <InputLabel>性別</InputLabel>
            <Select
              name="gender"
              value={memberData.gender}
              onChange={handleInputChange}
              label="性別"
            >
              <MenuItem value="Male">男</MenuItem>
              <MenuItem value="Female">女</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="電子郵件"
            value={memberData.email}
            fullWidth
            disabled
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          
          {/* 密碼修改部分 */}
          {isEditing && (
            <>
              <TextField
                label="新密碼"
                type="password"
                value={memberData.password}
                onChange={handleInputChange}
                name="password"
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="確認密碼"
                type="password"
                value={memberData.confirmPassword}
                onChange={handleInputChange}
                name="confirmPassword"
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            </>
          )}

          {/* 按鈕顯示 */}
          <Grid item xs={12}>
            {isEditing ? (
              <Button variant="contained" onClick={handleSave}>
                保存變更
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                編輯資料
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberProfile;
