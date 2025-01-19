import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import "./Header.css";
import logo from '../../assets/richfoodCoverV1.png';

const Header = () => {
  const navigate = useNavigate();

  // 用來存儲用戶資料的 state
  const [user, setUser] = useState(null);

  // useEffect 用來從 localStorage 獲取用戶資料
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);  // 如果有用戶資料，就更新 state
    }
  }, []);  // 這只在組件掛載時執行一次

  // 登入重定向
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // 回到首頁
  const handleHomeRedirect = () => {
    navigate('/');
  };

  // 進入熱門餐廳頁面
  const handlePopularRedirect = () => {
    navigate('/popularpage');
  };

  // 進入店家頁面
  const handleStoreRedirect = () => {
    navigate('/storePage');
  };

  // 進入會員或店家資料頁面
  const handleProfileRedirect = () => {
    if (user?.type === 'store') {
      navigate('/storeLoginPage');  // 假設是店家頁面
    } else {
      navigate('/memberLoginPage');  // 假設是會員頁面
    }
  };

  // 登出
  const handleLogout = () => {
    localStorage.removeItem('user');  // 清除 localStorage 中的用戶資料
    setUser(null);  // 更新狀態，觸發渲染
  };

  const variant = "btnPrimary";

  return (
    <div className="header">
      {/* 包裹 logo 和圖片的容器 */}
      <div className="left-container">
        <img className='logoImg' src={logo} alt="logo" onClick={handleHomeRedirect} />
        <h1 className="logo" onClick={handleHomeRedirect}>腹餓帶</h1>
      </div>
      
      {/* 用來將按鈕推到右邊 */}
      <div className="right-container">
        <Stack spacing={2} direction="row">
          <Button className={`btn ${variant}`} variant="allrestaurant" onClick={handleStoreRedirect}>所有餐廳</Button>
          <Button className={`btn ${variant}`} variant="Hotrestaurant" onClick={handlePopularRedirect}>熱門餐廳</Button>
          
          {/* 如果用戶已經登入，顯示會員或店家資訊，否則顯示登入按鈕 */}
          {user ? (
            <div className="profile-container">
              <Button className="member" variant="contained" onClick={handleProfileRedirect}>
                <Avatar alt={user.name} src={user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                {user.name}
              </Button>
              <Button className="member" variant="contained" onClick={handleLogout}>登出</Button>
            </div>
          ) : (
            <Button className="member" variant="contained" onClick={handleLoginRedirect}>會員/店家登入</Button>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Header;
