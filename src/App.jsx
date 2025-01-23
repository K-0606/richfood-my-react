// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AvatarProvider } from './pages/MemberComponents/AvatarContext';
import routes from './routes'; // 導入路由配置
import ErrorPage from './pages/ErrorPage';


function App() {
  const router = createBrowserRouter([
    ...routes, // 將 routes.js 中的路由配置展開到這裡
    { path: "*", element: <ErrorPage /> } // 添加錯誤頁面
  ]);

  return (
    <AvatarProvider>
      <RouterProvider router={router} />
    </AvatarProvider>
  );
}

export default App;
