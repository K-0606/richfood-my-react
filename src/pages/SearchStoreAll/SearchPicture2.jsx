import React, { useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import Select from 'react-select';

// 菜系選項
const cuisines = [
  { value: "hotpot", label: "火鍋" },
  { value: "japanese", label: "日式料理" },
  { value: "italian", label: "義式料理" },
  { value: "mexican", label: "墨西哥餐" },
  { value: "brunch", label: "早午餐" },
  { value: "snack", label: "小吃" },
  { value: "bistro", label: "餐酒館" },
  { value: "bar", label: "酒吧" },
  { value: "date_night", label: "約會餐廳" },
  { value: "dessert", label: "甜點" },
  { value: "bbq", label: "燒肉" },
  { value: "izakaya", label: "居酒屋" },
  { value: "chinese", label: "中式料理" },
];

const regions = [
  { value: "taipei", label: "台北" },
  { value: "taichung", label: "台中" },
  { value: "kaohsiung", label: "高雄" },
  { value: "miaoli", label: "苗栗" },  
  { value: "zhanghua", label: "彰化" },  
  { value: "yilan", label: "宜蘭" },
];

const MyComponent = () => {
  const [checkedCuisine, setCheckedCuisine] = useState(null); // 用來追蹤勾選的菜系
  const [checkedRegion, setCheckedRegion] = useState(null); // 用來追蹤勾選的地區
  const [selectedCuisines, setSelectedCuisines] = useState(null); // 用來追蹤菜系的Select選擇
  const [selectedRegions, setSelectedRegions] = useState(null); // 用來追蹤地區的Select選擇

  // Checkbox 勾選菜系變更處理
  const handleCuisineCheckboxChange = (event) => {
    const { checked, name } = event.target;

    console.log(`Cuisine Checkbox changed - Name: ${name}, Checked: ${checked}`);

    if (checked) {
      const selectedCuisine = cuisines.find((cuisine) => cuisine.label === name);
      setCheckedCuisine(name);
      setSelectedCuisines(selectedCuisine); // 更新Select菜系
      console.log(`勾選的菜系: ${name}`);
    } else {
      setCheckedCuisine(null);
      setSelectedCuisines(null);
      console.log(`取消勾選的菜系: ${name}`);
    }
  };

  // Checkbox 勾選地區變更處理
  const handleRegionCheckboxChange = (event) => {
    const { checked, name } = event.target;

    console.log(`Region Checkbox changed - Name: ${name}, Checked: ${checked}`);

    if (checked) {
      const selectedRegion = regions.find((region) => region.label === name);
      setCheckedRegion(name);
      setSelectedRegions(selectedRegion); // 更新Select地區
      console.log(`勾選的地區: ${name}`);
    } else {
      setCheckedRegion(null);
      setSelectedRegions(null);
      console.log(`取消勾選的地區: ${name}`);
    }
  };

  // Select 改變菜系時處理
  const handleCuisineSelectChange = (selectedOption) => {
    console.log(`Cuisine Select changed - Selected option: ${selectedOption ? selectedOption.label : 'None'}`);
    setSelectedCuisines(selectedOption);
    setCheckedCuisine(selectedOption ? selectedOption.label : null);
  };

  // Select 改變地區時處理
  const handleRegionSelectChange = (selectedOption) => {
    console.log(`Region Select changed - Selected option: ${selectedOption ? selectedOption.label : 'None'}`);
    setSelectedRegions(selectedOption);
    setCheckedRegion(selectedOption ? selectedOption.label : null);
  };

  // 发送数据到API
const sendDataToAPI = async () => {
  const data = {
    cuisine: selectedCuisines?.label || "",  // 使用 optional chaining 简化判断
    region: selectedRegions?.label || "",    // 使用 optional chaining 简化判断
  };

  try {
    const response = await fetch("https://your-api-endpoint.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });  

    const result = await response.json();
    console.log("API Response:", result);
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
//樣式
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "transparent", // 當懸停時顯示淺灰色背景
      color: state.isFocused ? "#000" : "#333", // 當懸停時字體顏色為黑色
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      padding: "5px",
      width: "300px",
      minWidth: "300px",    // 确保最小宽度是 300px
      maxWidth: "300px",    // 限制最大宽度为 300px
      overflow: "hidden",   // 防止溢出
    }),
    singleValue: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      color: "#747677",
      cursor: "pointer",
    }),
  };

  return (
    <div>
      {/* React-Select 菜系選擇 */}
      <div className="select-container" >
        <Select
          styles={customStyles}
          options={cuisines}
          value={selectedCuisines} // 綁定已選的菜系
          onChange={handleCuisineSelectChange}
          placeholder="搜尋餐廳 或 菜系"
          isSearchable
          closeMenuOnSelect={true}
        />
      {/* React-Select 地區選擇 */}
        <Select
          styles={customStyles}
          options={regions}
          value={selectedRegions} // 綁定已選的地區
          onChange={handleRegionSelectChange}
          placeholder="搜尋地區 或 地址"
          isSearchable
          closeMenuOnSelect={true}
        />
      </div>

      {/* 包裹菜系選擇的 Checkbox  */}
      <h2 style={{transform: 'translateX(100px)',marginTop: '20px', color:'gray',}}>餐廳選擇</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' ,transform: 'translateX(100px)',}}>
        {cuisines.map((cuisine) => (
          <FormControlLabel
            key={cuisine.value}
            control={<Checkbox checked={checkedCuisine === cuisine.label} onChange={handleCuisineCheckboxChange} name={cuisine.label} />}
            label={cuisine.label}
          />
        ))}
      </div>

      {/* 包裹地區選擇的 Checkbox */}
      <h2 style={{transform: 'translateX(100px)',marginTop: '20px', color:'gray',}}>地區選擇</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '20px',transform: 'translateX(100px)', }}>
        {regions.map((region) => (
          <FormControlLabel
            key={region.value}
            control={<Checkbox checked={checkedRegion === region.label} onChange={handleRegionCheckboxChange} name={region.label} />}
            label={region.label}
          />
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
