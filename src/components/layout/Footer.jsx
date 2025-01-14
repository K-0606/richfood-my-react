import React from 'react';
import { IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import './Footer.css'; // 引入 CSS 樣式文件

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        {/* Facebook 圖示 */}
        <IconButton
          component="a"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <Facebook fontSize="large" />
        </IconButton>
        
        {/* Instagram 圖示 */}
        <IconButton
          component="a"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <Instagram fontSize="large" />
        </IconButton>
        
        {/* YouTube 圖示 */}
        <IconButton
          component="a"
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <YouTube fontSize="large" />
        </IconButton>
      </div>
      <p className="footer-text">© 2025 腹餓帶 - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
