import React from 'react';
import ReactDOM from 'react-dom/client';  // 確保正確引入 ReactDOM
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// 使用 ReactDOM.createRoot 渲染應用，並設置 basename 來處理路由
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/richfood-my-react">  {/* 設定路由的基礎路徑 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
