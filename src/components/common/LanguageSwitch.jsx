import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box"; // 修正 Box 的導入

const LanguageSwitch = () => {
  const [language, setLanguage] = useState("zh");

  const toggleLanguage = (event) => {
    setLanguage(event.target.value); // 根據選擇的值來更新語言
  };

  // 定義樣式
  const styles = {
    switchContainer: {
      fontSize: "14px",
      userSelect: "none",
    },
    span: {
      margin: "0 10px",
      transition: "font-weight 0.3s, color 0.3s",
      cursor: "pointer", // 預設指針為可點擊
    },
    active: {
      fontWeight: "bolder", // 更強調粗體效果
      color: "#333",
    },
    hover: {
      color: "#007bff",
    },
    nonHover: {
      color: "inherit", // 當前選擇語言，禁用 hover 顏色
    },
    disabled: {
      cursor: "default", // 禁用當前語言的 pointer
      color: "black", // 顯示較淡顏色，表示禁用狀態
    },
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <div style={styles.switchContainer}>
        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
          <InputLabel id="language-select-label">語言</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language} // 綁定選中的語言
            label="Language"
            onChange={toggleLanguage} // 直接使用 onChange 來處理語言切換
          >
            <MenuItem
              value="zh"
              disabled={language === "zh"} // 當前選語言禁用
              style={{
                ...styles.span,
                ...(language === "zh" ? styles.active : {}),
              }}
            >
              繁體中文
            </MenuItem>
            <MenuItem
              value="en"
              disabled={language === "en"} // 當前選語言禁用
              style={{
                ...styles.span,
                ...(language === "en" ? styles.active : {}),
              }}
            >
              English
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
};

export default LanguageSwitch;
