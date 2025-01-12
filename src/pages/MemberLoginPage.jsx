// src/components/MemberProfile.jsx
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl, Avatar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const MemberLoginPage = () => {
  //資料
  const initialData = {
    id: "12345",
    name: "Rich Food",
    gender: "Male",
    email: "richfood@example.com",
    avatarUrl: "https://megapx-assets.dcard.tw/images/7d91a6c1-e79c-4f43-a57e-66670e71fca2/1280.webp" // 假圖像URL
  };

  const [memberData, setMemberData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null); // 用來儲存選擇的圖像檔案

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // 在這裡可以進行保存資料的邏輯，這裡只是模擬為簡化
    console.log("Saved Member Data: ", memberData);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberData((prevState) => ({
          ...prevState,
          avatarUrl: reader.result // 更新為新圖像
        }));
      };
      reader.readAsDataURL(file); // 將圖像檔案轉為Base64格式
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>會員資料</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          {/* 會員圖像顯示區域 */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              src={memberData.avatarUrl}
              alt="會員圖像"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          {/* 無論是否處於編輯模式，都可以更換圖像 */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            <PhotoCamera sx={{ marginRight: 1 }} />
            更換圖像
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Grid>

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

export default MemberLoginPage;
