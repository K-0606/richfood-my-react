import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AvatarProvider } from './pages/MemberComponents/AvatarContext';
import { ThemeProvider } from '@mui/material/styles'; // 引入 ThemeProvider
import theme from './theme'; // 引入我們創建的 theme 配置
import routes from './routes'; // 導入路由配置
import ErrorPage from './pages/ErrorPage';

function App() {
  const router = createBrowserRouter([
    ...routes, // 將 routes.js 中的路由配置展開到這裡
    { path: "*", element: <ErrorPage /> } // 添加錯誤頁面
  ]);

  return (
    <ThemeProvider theme={theme}>  {/* 使用 ThemeProvider 包裹整個應用 */}
      <AvatarProvider>
        <RouterProvider router={router} />
      </AvatarProvider>
    </ThemeProvider>
  );
}

export default App;
