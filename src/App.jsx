import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AvatarProvider } from './pages/MemberComponents/AvatarContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import routes from './routes';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home/> },
    { path: "*", element: <ErrorPage /> }, // 用來處理未知路由的錯誤頁面
  ]);

  // 設置 basename，根據當前環境來決定
  const basename = process.env.NODE_ENV === 'production' ? '/richfood-my-react' : '/';

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <AvatarProvider>
          {/* 根據環境設置 basename */}
          <RouterProvider router={router} basename={basename} />
        </AvatarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
