import * as React from 'react';
import { Component } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Header.css";

export default class Header extends Component {
  render() {

    const variant = "btnPrimary";

    return (
      <div className="header">
        <h1 className="logo">腹二帶</h1>
        <div>
        <Stack spacing={2} direction="row">
          <Button className={`btn ${variant}`} variant="allrestaurant">所有餐廳</Button>
          <Button className={`btn ${variant}`} variant="Hotrestaurant">熱門餐廳</Button>
          <Button className="member"variant="member">會員/店家登入</Button>
        </Stack>
        </div>
      </div>
    );
  }
}

