import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAvatar } from './AvatarContext'; // 引入 AvatarContext
import axios from 'axios';


const BASE_URL = "http://localhost:8080"; // 基底 URL

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
  const { avatarUrl, setAvatarUrl } = useAvatar(); // 取得 avatarUrl 和 setAvatarUrl
  const [editedData, setEditedData] = useState({ ...memberData });
  const [newAvatar, setNewAvatar] = useState(null); // 用於儲存上傳的頭像

  // 初始化頭像 URL
  useEffect(() => {
    if (memberData && memberData.avatarUrl) {
      // console.log('Avatar URL:', memberData.avatarUrl); // 確認 URL 是否正確
      setAvatarUrl(memberData.avatarUrl);
    } else {
      // console.warn('No avatarUrl found, using default avatar.');
      setAvatarUrl('/default-avatar.png');
    }
  }, [memberData]);


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
    // 調用父組件的 `onSave` 方法，將變更的數據和文件傳遞到父組件
    onSave(editedData);
    setIsEditing(false);
  };

  // 處理頭像上傳
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 預覽圖片
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);

      // 發送到後端
      const formData = new FormData();
      formData.append('userId', memberData.id); // 傳遞用戶 ID
      formData.append('iconFile', file); // 傳遞文件

      // 向後端上傳頭像
      axios
        .put(`${BASE_URL}/User/updateUser`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        })
        .then((response) => {
          alert('頭像更新成功！');
          setAvatarUrl(`${BASE_URL}${response.data.icon}?t=${Date.now()}`); // 更新最新頭像
        })
        .catch((err) => {
          alert('頭像更新失敗，請稍後再試');
        })
        .finally(() => {
          URL.revokeObjectURL(objectUrl); // 清理對象 URL
        });
    }
  };


  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>會員資料</Typography>

      <Grid container spacing={2}>
        {/* 顯示頭像 */}
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              src={avatarUrl || '/default-avatar.png'}
              alt="會員頭像"
              style={{ width: 150, height: 150, borderRadius: '50%' }}
              onError={(e) => {
                console.error('Image failed to load, using default avatar');
                e.target.onerror = null; // 防止重複觸發
                e.target.src = '/default-avatar.png';
              }}
            />

          </Box>
          {/* 變更頭像按鈕 */}
          <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
            <Button variant="outlined" component="label">
              變更頭像
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Button>
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
            fullWidth
            variant="outlined"
            disabled
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
