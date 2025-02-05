import React, { useState } from 'react';

const LanguageSwitch = () => {
  const [language, setLanguage] = useState('zh');

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  // 定義樣式
  const styles = {
    switchContainer: {
      fontSize: '16px',
      userSelect: 'none',
    },
    span: {
      margin: '0 10px',
      transition: 'font-weight 0.3s, color 0.3s',
      cursor: 'pointer', // 預設指針為可點擊
    },
    active: {
      fontWeight: 'bolder',  // 更強調粗體效果
      color: '#333',
    },
    hover: {
      color: '#007bff',
    },
    nonHover: {
      color: 'inherit',  // 當前選擇語言，禁用 hover 顏色
    },
    disabled: {
      cursor: 'default', // 禁用當前語言的 pointer
      color: 'black',     // 顯示較淡顏色，表示禁用狀態
    }
  };

  return (
    <div style={styles.switchContainer}>
      <span
        style={{
          ...styles.span,
          ...(language === 'zh' ? styles.active : {}),
          ...(language === 'zh' ? styles.disabled : {}), // 禁用當前選擇語言
        }}
        onClick={language !== 'zh' ? () => toggleLanguage('zh') : undefined} // 只有非當前語言才可以點擊
        onMouseEnter={(e) => language !== 'zh' && (e.target.style.color = '#007bff')}
        onMouseLeave={(e) => language !== 'zh' && (e.target.style.color = '')}
      >
        繁體中文
      </span>
      |
      <span
        style={{
          ...styles.span,
          ...(language === 'en' ? styles.active : {}),
          ...(language === 'en' ? styles.disabled : {}), // 禁用當前選擇語言
        }}
        onClick={language !== 'en' ? () => toggleLanguage('en') : undefined} // 只有非當前語言才可以點擊
        onMouseEnter={(e) => language !== 'en' && (e.target.style.color = '#007bff')}
        onMouseLeave={(e) => language !== 'en' && (e.target.style.color = '')}
      >
        English
      </span>
    </div>
  );
};

export default LanguageSwitch;
