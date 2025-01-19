// src/pages/MemberComponents/MemberProfile.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MemberProfile = ({
  memberData,
  onSave,
  isEditing,
  setIsEditing,
  isChangingPassword,
  setIsChangingPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  handleSavePassword,
  passwordError
}) => {
  
  const [editedData, setEditedData] = useState({ ...memberData });

  // 處理會員資料變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // 儲存會員資料
  const handleSave = () => {
    onSave(editedData); // 儲存編輯後的資料
    setIsEditing(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>會員資料</Typography>

      <Grid container spacing={2}>
        {/* 顯示頭像 */}
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              src={memberData.avatarUrl}
              alt="會員頭像"
              style={{ width: 150, height: 150, borderRadius: '50%' }}
            />
          </Box>
        </Grid>

        {/* 顯示會員資料表單 */}
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
            value={editedData.name}
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
              value={editedData.gender}
              onChange={handleInputChange}
              name="gender"
            >
              <MenuItem value="male">男性</MenuItem>
              <MenuItem value="female">女性</MenuItem>
              <MenuItem value="other">其他</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="會員帳號"
            value={editedData.account}
            onChange={handleInputChange}
            name="account"
            fullWidth
            variant="outlined"
            disabled={!isEditing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="電子郵件"
            value={editedData.email}
            onChange={handleInputChange}
            name="email"
            fullWidth
            variant="outlined"
            disabled={!isEditing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="電話"
            value={editedData.phone}
            onChange={handleInputChange}
            name="phone"
            fullWidth
            variant="outlined"
            disabled={!isEditing}
            sx={{ marginBottom: 2 }}
          />

          {/* 儲存或編輯模式切換 */}
          <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
            {isEditing ? (
              <Button variant="contained" onClick={handleSave}>
                儲存變更
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                編輯資料
              </Button>
            )}
          </Box>

          {/* 變更密碼區塊 */}
          <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
            <Button variant="outlined" onClick={() => setIsChangingPassword(!isChangingPassword)}>
              變更密碼
            </Button>
          </Box>

          {isChangingPassword && (
            <Box sx={{ marginTop: 3 }}>
              <TextField
                label="新密碼"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="確認新密碼"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              {passwordError && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                  {passwordError}
                </Typography>
              )}
              <Box display="flex" justifyContent="center">
                <Button variant="contained" onClick={handleSavePassword}>
                  儲存密碼
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberProfile;
