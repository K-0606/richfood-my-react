// src/pages/Home.jsx
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// 導入需要的子組件
import Comments from './MemberComponents/Comments';
import Collections from './MemberComponents/Collections';
import Coupons from './MemberComponents/Coupons';
import Reservations from './MemberComponents/Reservations';
import MemberProfile from './MemberComponents/MemberProfile'; // 引入 MemberProfile

const Home = () => {
  const [activeContent, setActiveContent] = useState('comments'); // 預設顯示 我的評論
  const [isEditing, setIsEditing] = useState(false); // 控制是否顯示編輯模式
  const [isChangingPassword, setIsChangingPassword] = useState(false); // 控制是否顯示變更密碼區塊
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 預設會員資料
  const [memberData, setMemberData] = useState({
    id: '12345',
    name: 'Rich Food',
    gender: 'male',
    account:'user123',
    email: 'richfood@example.com',
    phone: '0987654321',
    avatarUrl: 'https://megapx-assets.dcard.tw/images/7d91a6c1-e79c-4f43-a57e-66670e71fca2/1280.webp',
    password: '', // 密碼為空，會與用戶輸入的密碼做比較
  });

  const handleButtonClick = (content) => {
    setActiveContent(content); // 控制顯示的內容
  };

  const handleSaveProfile = (updatedData) => {
    setMemberData(updatedData); // 儲存會員資料
    console.log('儲存的會員資料:', updatedData);
    setIsEditing(false); // 停止編輯模式
  };

  const handleSavePassword = () => {
    // 密碼校驗邏輯
    if (newPassword !== confirmNewPassword) {
      setPasswordError('新密碼和確認密碼不一致');
      return;
    }
    // 密碼一致後，進行儲存操作
    setMemberData((prevData) => ({
      ...prevData,
      password: newPassword, // 更新密碼
    }));
    setPasswordError('');
    setIsChangingPassword(false); // 停止變更密碼模式
    setNewPassword('');
    setConfirmNewPassword('');
    alert('密碼已更新');
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 3 }}>
        {/* 顯示五個按鈕 */}
        <Box display="flex" justifyContent="center" sx={{ marginBottom: 4 }}>
          <Button variant="outlined" onClick={() => handleButtonClick('comments')}>我的評論</Button>
          <Button variant="outlined" onClick={() => handleButtonClick('collections')}>我的珍藏</Button>
          <Button variant="outlined" onClick={() => handleButtonClick('coupons')}>我的餐券</Button>
          <Button variant="outlined" onClick={() => handleButtonClick('reservations')}>我的訂位</Button>
          <Button variant="outlined" onClick={() => handleButtonClick('profile')}>會員資料</Button>
        </Box>

        {/* 根據 activeContent 顯示不同的組件 */}
        {activeContent === 'comments' && <Comments />}
        {activeContent === 'collections' && <Collections />}
        {activeContent === 'coupons' && <Coupons />}
        {activeContent === 'reservations' && <Reservations />}
        {activeContent === 'profile' && (
          <MemberProfile 
            memberData={memberData} 
            onSave={handleSaveProfile} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
            isChangingPassword={isChangingPassword} 
            setIsChangingPassword={setIsChangingPassword} 
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmNewPassword={confirmNewPassword}
            setConfirmNewPassword={setConfirmNewPassword}
            handleSavePassword={handleSavePassword}
            passwordError={passwordError}
          />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Home;
