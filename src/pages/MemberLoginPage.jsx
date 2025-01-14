// src/pages/Home.jsx
import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { useAvatar } from './MemberComponents/AvatarContext'; // 引入 AvatarContext

// 導入需要的子組件
import Comments from './MemberComponents/Comments';
import Collections from './MemberComponents/Collections';
import Coupons from './MemberComponents/Coupons';
import Reservations from './MemberComponents/Reservations';
import MemberProfile from './MemberComponents/MemberProfile';

const Home = () => {
  const { avatarUrl, setAvatarUrl } = useAvatar();  // 從 context 獲取頭像與更新函數
  const [activeContent, setActiveContent] = useState(''); // 用來控制顯示內容
  const [isEditing, setIsEditing] = useState(false); // 控制是否顯示編輯模式

  // 新增狀態變數，保存會員資料
  const [account, setAccount] = useState('user123');  // 假設預設帳號為 'user123'
  const [email, setEmail] = useState('user@example.com');  // 假設預設email為 'user@example.com'
  const [name, setName] = useState('John Doe');  // 預設姓名
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);  // 更新頭像
      };
      reader.readAsDataURL(file);  // 將圖片轉換為 Base64 格式
    }
  };

  // 儲存帳號與email
  const handleSaveChanges = () => {
    // 這裡可以加上保存的邏輯，比如向後端發送請求保存帳號與email
    console.log('保存會員資料:', { name, email, account, newPassword });
    setIsEditing(false);  // 完成編輯後關閉編輯模式
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>會員首頁</Typography>

      {/* 顯示頭像區域 */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: 4 }}>
        <img 
          src={avatarUrl} 
          alt="會員頭像" 
          style={{ width: 150, height: 150, borderRadius: '50%' }} 
        />
      </Box>

      {/* 顯示「更換頭像」按鈕 */}
      {activeContent === 'profile' && (
        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
          <Button variant="outlined" component="label">
            更換頭像
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>
      )}

      {/* 顯示五個按鈕 */}
      <Box display="flex" justifyContent="center" spacing={2}>
        <Button variant="outlined" onClick={() => handleButtonClick('comments')}>我的評論</Button>
        <Button variant="outlined" onClick={() => handleButtonClick('collections')}>我的珍藏</Button>
        <Button variant="outlined" onClick={() => handleButtonClick('coupons')}>我的餐券</Button>
        <Button variant="outlined" onClick={() => handleButtonClick('reservations')}>我的訂位</Button>
        <Button variant="outlined" onClick={() => handleButtonClick('profile')}>會員資料</Button>
      </Box>

      {/* 會員資料頁面顯示各個欄位 */}
      <Box sx={{ marginTop: 4 }}>
        {activeContent === 'profile' && (
          <Box>
            {/* 會員ID (不可編輯) */}
            <Typography variant="h6">會員ID</Typography>
            <Typography sx={{ marginBottom: 2 }}>{account}</Typography>

            {/* 會員姓名 */}
            <Typography variant="h6">會員姓名</Typography>
            {isEditing ? (
              <TextField 
                label="會員姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <Typography>{name}</Typography>
            )}

            {/* 電子郵件 */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>電子郵件</Typography>
            {isEditing ? (
              <TextField 
                label="電子郵件"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <Typography>{email}</Typography>
            )}

            {/* 帳號 */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>帳號</Typography>
            {isEditing ? (
              <TextField 
                label="帳號"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <Typography>{account}</Typography>
            )}

            {/* 新密碼 */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>新密碼</Typography>
            {isEditing ? (
              <TextField 
                type="password"
                label="新密碼"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <Typography>********</Typography>
            )}

            {/* 確認密碼 */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>確認密碼</Typography>
            {isEditing ? (
              <TextField 
                type="password"
                label="確認密碼"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <Typography>********</Typography>
            )}

            {/* 編輯模式切換 */}
            {isEditing ? (
              <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <Button variant="outlined" onClick={handleSaveChanges}>儲存變更</Button>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <Button variant="outlined" onClick={() => setIsEditing(true)}>編輯</Button>
              </Box>
            )}
          </Box>
        )}

        {activeContent === 'comments' && <Comments />}
        {activeContent === 'collections' && <Collections />}
        {activeContent === 'coupons' && <Coupons />}
        {activeContent === 'reservations' && <Reservations />}
      </Box>
    </Box>
  );
};

export default Home;
