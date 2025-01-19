import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Avatar } from '@mui/material';

const StoreUpdateInfo = ({ storeData, onUpdateStoreData }) => {
  const [editStoreData, setEditStoreData] = useState({
    name: storeData.name,
    address: storeData.address,
    businessHours: storeData.businessHours,
    phone: storeData.phone,
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(storeData.avatar);
  const [isPasswordChange, setIsPasswordChange] = useState(false); // 控制顯示新密碼欄位
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false); // 密碼是否更新過

  // 當欄位變更時更新對應狀態
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStoreData({ ...editStoreData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // 更新預覽圖
      };
      reader.readAsDataURL(file);
    }
  };

  // 提交更新
  const handleSubmit = () => {
    // 更新資料
    const updatedData = {
      ...editStoreData,
      avatar, // 更新頭像
    };

    // 模擬回傳更新的資料
    console.log("更新的店家資料: ", updatedData);

    // 更新資料到父組件
    onUpdateStoreData(updatedData);

    // 提示成功
    alert('店家資訊已更新');
  };

  // 確認修改密碼
  const handleConfirmPasswordChange = () => {
    // 密碼校驗
    if (newPassword && newPassword !== confirmPassword) {
      alert('新密碼和確認密碼不一致');
      return;
    }

    // 更新密碼
    const updatedData = {
      ...editStoreData,
      avatar, // 頭像保持不變
      newPassword, // 新密碼儲存
    };

    // 模擬回傳更新的資料
    console.log("更新的密碼: ", newPassword);

    // 更新密碼並回傳到父組件
    onUpdateStoreData(updatedData);

    // 密碼更新成功，隱藏密碼欄位並提示
    setIsPasswordUpdated(true);
    setIsPasswordChange(false); // 隱藏密碼欄位
    alert('密碼已成功更新');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6">更新店家資訊</Typography>

      {/* 頭像更新區塊 */}
      <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">店家頭像</Typography>
          <Avatar src={avatar} sx={{ width: 120, height: 120, mb: 2 }} />
          <Button variant="contained" component="label">
            更換頭像
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>
        </Grid>
      </Grid>

      {/* 店家資訊更新區塊 */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* 店家名稱 */}
        <Grid item xs={12}>
          <TextField
            label="店家名稱"
            variant="outlined"
            fullWidth
            value={editStoreData.name}
            name="name"
            onChange={handleChange}
          />
        </Grid>

        {/* 營業地址 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="營業地址"
            variant="outlined"
            fullWidth
            value={editStoreData.address}
            name="address"
            onChange={handleChange}
          />
        </Grid>

        {/* 營業時間 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="營業時間"
            variant="outlined"
            fullWidth
            value={editStoreData.businessHours}
            name="businessHours"
            onChange={handleChange}
          />
        </Grid>

        {/* 餐廳電話 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="餐廳電話"
            variant="outlined"
            fullWidth
            value={editStoreData.phone}
            name="phone"
            onChange={handleChange}
          />
        </Grid>

        {/* 密碼更新區塊 */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => setIsPasswordChange(true)} // 顯示新密碼欄位
            sx={{ width: "100%" }}
          >
            更改密碼
          </Button>
          {isPasswordChange && !isPasswordUpdated && (
            <>
              <TextField
                label="新密碼"
                variant="outlined"
                fullWidth
                type="password"
                value={newPassword}
                name="newPassword"
                onChange={handlePasswordChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="確認密碼"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handlePasswordChange}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleConfirmPasswordChange}
                sx={{ mt: 2 }}
              >
                確認修改密碼
              </Button>
            </>
          )}
        </Grid>

        {/* 提交按鈕 */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            更新資訊
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreUpdateInfo;
