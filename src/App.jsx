import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AvatarProvider } from './pages/MemberComponents/AvatarContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import routes from './routes';
import ErrorPage from './pages/ErrorPage';

function App() {
  const router = createBrowserRouter([
    ...routes,
    { path: "*", element: <ErrorPage /> }, // 用來處理未知路由的錯誤頁面
  ]);

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <AvatarProvider>
          {/* 這裡只使用 RouterProvider 並設置 basename */}
          <RouterProvider router={router} />
        </AvatarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
