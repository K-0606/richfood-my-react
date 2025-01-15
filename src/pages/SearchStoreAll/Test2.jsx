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

    // 更新 checkedItem
    if (checked && name === '火鍋') {
      setCheckedItem(name);
      setSelectedCuisines({ value: 'hotpot', label: '火鍋' }); // 當勾選火鍋時，選擇火鍋
    } else {
      setCheckedItem(null);
      setSelectedCuisines(null); // 取消勾選時清空選擇
    }
  };

  // Select 改變時處理
  const handleCuisineChange = (selectedOption) => {
    setSelectedCuisines(selectedOption);
    
    // 根據 Select 選擇的項目來勾選或取消勾選 Checkbox
    if (selectedOption && selectedOption.value === 'hotpot') {
      setCheckedItem(true); // 如果選擇了火鍋，則勾選 Checkbox
    } else {
      setCheckedItem(false); // 其他菜系，取消勾選
    }
  };

  return (
    <div>
      {/* Checkbox 來選擇火鍋 */}
      <FormControlLabel
        control={<Checkbox checked={checkedItem} onChange={handleCheckboxChange} name="火鍋" />}
        label="火鍋"
      />
      
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
  );
};

export default MyComponent;
