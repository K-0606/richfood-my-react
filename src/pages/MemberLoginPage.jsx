// src/pages/Home.jsx
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  const [isEditing, setIsEditing] = useState(false); // 控制是否顯示更換頭像按鈕
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

      {/* 進入會員資料頁面顯示相應內容 */}
      <Box sx={{ marginTop: 4 }}>
        {activeContent === 'comments' && <Comments />}
        {activeContent === 'collections' && <Collections />}
        {activeContent === 'coupons' && <Coupons />}
        {activeContent === 'reservations' && <Reservations />}
        {activeContent === 'profile' && <MemberProfile />}
      </Box>
    </Box>
  );
};

export default Home;
