import React from 'react';
import { useNavigate } from 'react-router-dom';  // 引入 useNavigate
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Header.css";
import "../../assets/richfood-Cover.png"

const Header = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };
  

  const variant = "btnPrimary";

  return (
    <div className="header">
      <h1 className="logo">腹餓帶</h1>
      <img src="../../assets/richfood-Cover.png" alt="logo" />
      <div>
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
