import { createTheme } from '@mui/material/styles';

// 創建一個自定義的 MUI 主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // 主要顏色，藍色
    },
    secondary: {
      main: '#ff4081',  // 次要顏色，粉紅色
    },
    background: {
      paper: '#fff',    // 背景顏色
      default: '#fafafa', // 頁面背景顏色
    },
    text: {
      primary: '#333',  // 文字顏色
      secondary: '#888',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
    // 其他字體樣式...
  },
});

export default theme;
