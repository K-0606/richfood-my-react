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

  // 進入店家頁面
  const handleStoreRedirect = () => {
    navigate('/SearchStore');
  };
  
  // 進入熱門餐廳頁面
  const handlePopularRedirect = () => {
    navigate('/popularpage');
  };


  // 進入會員或店家資料頁面
  const handleProfileRedirect = () => {
    if (user?.type === 'store') {
      navigate('/storePage');  // 假設是店家頁面
    } else {
      navigate('/memberPage');  // 假設是會員頁面
    }
  };

  // 登出
  const handleLogout = () => {
    localStorage.removeItem('user');  // 清除 localStorage 中的用戶資料
    setUser(null);  // 更新狀態，觸發渲染
    navigate('/');  // 登出後跳轉到首頁
  };

  const variant = "btnPrimary";

  return (
    <div className="header">
      {/* 包裹 logo 和圖片的容器 */}
      <div className="left-container">
        <img className='logoImg' src={logo} alt="logo" onClick={handleHomeRedirect} />
        {/* <h1 className="logo" onClick={handleHomeRedirect}>RichFood</h1> */}
      </div>
      
      {/* 用來將按鈕推到右邊 */}
      <div className="right-container">
        <Stack spacing={2} direction="row">
          <Button className={`btn ${variant}`} variant="allrestaurant" onClick={handleStoreRedirect}>All restaurants</Button>
          <Button className={`btn ${variant}`} variant="Hotrestaurant" onClick={handlePopularRedirect}>Popular restaurants</Button>
          
          {/* 如果用戶已經登入，顯示會員或店家資訊，否則顯示登入按鈕 */}
          {user ? (
            <div className="profile-container">
              <Button className="member" variant="contained" onClick={handleProfileRedirect}>
                <Avatar alt={user.name} src={user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                {user.name}
              </Button>
              <Button className="member" variant="contained" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button className="member" variant="contained" onClick={handleLoginRedirect}>Member/Store Login</Button>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Header;
