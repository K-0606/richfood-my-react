// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AvatarProvider } from './pages/MemberComponents/AvatarContext';
import { UserProvider } from './context/UserContext'; // 引入 UserProvider
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import routes from './routes';
import ErrorPage from './pages/ErrorPage';

function App() {
  const router = createBrowserRouter([
    ...routes,
    { path: "*", element: <ErrorPage /> },
  ]);

  return (
  <UserProvider>{/* 使用 UserProvider 包裹整個應用 */}
    <ThemeProvider theme={theme}>
        <AvatarProvider>
          <RouterProvider router={router}  />
        </AvatarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
