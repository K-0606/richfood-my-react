import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useUser } from '../../context/UserContext';  // 引入 useUser
import "./Header.css";
import logo from '../../assets/richfoodCoverV1.png';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();  // 使用 useUser hook，從 context 中獲取 user 資料

  // 用來處理登入導向
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // 用來處理首頁導向
  const handleHomeRedirect = () => {
    navigate('/');
  };

  // 用來處理搜尋店家導向
  const handleStoreRedirect = () => {
    navigate('/SearchStore');
  };

  // 用來處理熱門餐廳導向
  const handlePopularRedirect = () => {
    navigate('/popularpage');
  };

  const handleProfileRedirect = () => {
    console.log(user?.userType);  // 這裡改為 userType
    // 確保 user 資料已正確載入並檢查 userType
    if (user?.userType != 'member') {
      navigate('/StoreLogin');  // 店家登入
    } else if (user?.userType === 'member') {
      navigate('/MemberLogin');  // 會員登入
    } else {
      navigate('/login');  // 如果沒有正確的 user 類型，跳轉到一般的登入頁
    }
  };
  

  // 用來處理登出
  const handleLogout = () => {
    logout();  // 使用 context 的 logout 方法
    navigate('/');  // 登出後跳轉到首頁
    if (user?.userType != 'member') {
      fetch("http://localhost:8080/store/storeLogOut", {
        method: "GET",
        credentials: 'include'})

      console.log('店家登出')
    } else {
      fetch("http://localhost:8080/User/logout", {
        method: "POST",
        credentials: 'include'})
      console.log('會員登出')
    }
    
  };

  const variant = "btnPrimary";

  return (
    <div className="header">
      <div className="left-container">
        <img className='logoImg' src={logo} alt="logo" onClick={handleHomeRedirect} />
        <h1 className="logo" onClick={handleHomeRedirect}>腹餓帶</h1>
      </div>
      
      <div className="right-container">
        <Stack spacing={2} direction="row">
          <Button className={`btn ${variant}`} variant="allrestaurant" onClick={handleStoreRedirect}>所有餐廳</Button>
          <Button className={`btn ${variant}`} variant="Hotrestaurant" onClick={handlePopularRedirect}>熱門餐廳</Button>
          
          {user ? (
            <div className="profile-container">
              <Button className="member" variant="contained" onClick={handleProfileRedirect}>
                <Avatar alt={user.name} src={user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                {user.userType === "member" ? `${user.name}` : `${user.restaurants.name}`} {/* 根據身份顯示 */}
                {/* {user.name} */}
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
