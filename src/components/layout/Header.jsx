import React from 'react';
import { useNavigate } from 'react-router-dom';  // 引入 useNavigate
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Header.css";
import logo from '../../assets/richfoodCoverV1.png'

const Header = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };
  const handlePopularRedirect = () => {
    navigate('/popular');
  };
  const handleStoreRedirect = () => {
    navigate('/storePage');
  };
  

  const variant = "btnPrimary";

  return (
    <div className="header">
      {/* 包裹 logo 和圖片的容器 */}
      <div className="left-container">
        <img className='logoImg' src={logo} alt="logo" onClick={handleHomeRedirect}/>
        <h1 className="logo" onClick={handleHomeRedirect}>腹餓帶</h1>
      </div>
      
      {/* 用來將按鈕推到右邊 */}
      <div className="right-container">
        <Stack spacing={2} direction="row">
          <Button className={`btn ${variant}`} variant="allrestaurant">所有餐廳</Button>
          <Button className={`btn ${variant}`} variant="Hotrestaurant">熱門餐廳</Button>
          <Button className="member" variant="member" onClick={handleLoginRedirect}>會員/店家登入</Button>
        </Stack>
      </div>
    </div>
  );
}

export default Header;
