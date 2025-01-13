// src/pages/MemberComponents/AvatarContext.js
import React, { createContext, useState, useContext } from 'react';

// 創建一個 AvatarContext
export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState("https://megapx-assets.dcard.tw/images/7d91a6c1-e79c-4f43-a57e-66670e71fca2/1280.webp"); // 預設頭像

  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </AvatarContext.Provider>
  );
};

// 自訂 hook，簡化訪問 context
export const useAvatar = () => useContext(AvatarContext);
