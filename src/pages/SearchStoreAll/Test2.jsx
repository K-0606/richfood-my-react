import React, { useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import Select from 'react-select';

// 菜系選項
const cuisines = [
  { value: "hotpot", label: "火鍋" },
  { value: "japanese", label: "日式料理" },
  { value: "italian", label: "義大利餐" },
  { value: "mexican", label: "墨西哥餐" },
];

const MyComponent = () => {
  const [checkedItem, setCheckedItem] = useState(null); // 用來追蹤勾選的項目
  const [selectedCuisines, setSelectedCuisines] = useState(null); // 用來追蹤Select的選擇

  // Checkbox 勾選變更處理
  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;

    // 根據勾選狀態動態處理
    if (checked) {
      // 當勾選任意菜系時，將菜系的 value 和 label 設置為選中項目
      const selectedCuisine = cuisines.find((cuisine) => cuisine.label === name);
      setCheckedItem(name);
      setSelectedCuisines(selectedCuisine); // 更新Select選擇
    } else {
      // 當取消勾選時，清空選擇
      setCheckedItem(null);
      setSelectedCuisines(null);
    }
  };

  // Select 改變時處理
  const handleCuisineChange = (selectedOption) => {
    setSelectedCuisines(selectedOption);
    
    // 根據 Select 選擇的項目來勾選或取消勾選 Checkbox
    if (selectedOption) {
      setCheckedItem(selectedOption.label); // 如果選擇了某個菜系，則勾選對應的 Checkbox
    } else {
      setCheckedItem(null); // 清除選擇
    }
  };

  return (
    <div>
      {/* 包裹兩個元素的容器，使用 Flexbox 來控制位置 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Checkbox 來選擇不同的菜系 */}
        {cuisines.map((cuisine) => (
          <FormControlLabel
            key={cuisine.value}
            control={<Checkbox checked={checkedItem === cuisine.label} onChange={handleCheckboxChange} name={cuisine.label} />}
            label={cuisine.label}
          />
        ))}
        
        {/* React-Select 菜系選擇 */}
        <div className="select-container">
          <Select
            options={cuisines}
            value={selectedCuisines} // 綁定已選的菜系
            onChange={handleCuisineChange}
            placeholder="搜尋餐廳 或 菜系"
            isSearchable
            closeMenuOnSelect={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
