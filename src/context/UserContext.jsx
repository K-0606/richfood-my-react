// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 嘗試從 localStorage 載入使用者資料
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));  // 如果有保存，載入 user 資料
    }
    // else {
    //   // 如果 localStorage 沒有資料，可以強制設置模擬用戶資料
    //   const mockUser = {
    //     id: 1,
    //     name: '測試會員',
    //     userType: 'member',
    //     avatar: 'https://example.com/avatar.jpg',
    //   };
    //   setUser(mockUser);  // 直接設定模擬的 user 資料
    //   localStorage.setItem('user', JSON.stringify(mockUser));  // 同步存入 localStorage
    // }
  }, []);

  // 登入方法
  const login = (userData) => {
    setUser(userData);  // 更新 user 狀態
    localStorage.setItem('user', JSON.stringify(userData));  // 存入 localStorage
  };

  // 登出方法
  const logout = () => {
    setUser(null);  // 清空 user 狀態
    localStorage.removeItem('user');  // 移除 localStorage 中的 user 資料
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
