import React, { useState } from "react";
import Select from "react-select";
import './SearchSh.css'; // 引入樣式檔案

function SearchSh() {
  const [selectedCuisines, setSelectedCuisines] = useState([null]);
  const [selectedRegions, setSelectedRegions] = useState([null]);

  // 菜系選項
  const cuisines = [
    { value: "chinese", label: "中餐" },
    { value: "japanese", label: "日式料理" },
    { value: "italian", label: "義大利餐" },
    { value: "mexican", label: "墨西哥餐" },
  ];

  // 地區選項
  const regions = [
    { value: "taipei", label: "台北" },
    { value: "taichung", label: "台中" },
    { value: "kaohsiung", label: "高雄" },
    { value: "miaoli", label: "苗栗" },  
    { value: "zhanghua", label: "彰化" },  
    { value: "yilan", label: "宜蘭" },
  ];

  // 處理菜系選擇
  const handleCuisineChange = (selectedOptions) => {
    setSelectedCuisines(selectedOptions || []);
    console.log("Selected Cuisine:", selectedOptions ? selectedOptions.label : null);
  };

  // 處理地區選擇
  const handleRegionChange = (selectedOptions) => {
    setSelectedRegions(selectedOptions || []);
    console.log("Selected Region:", selectedOptions ? selectedOptions.label : null);
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

        <div className="select-container">
          {/* React-Select 菜系選擇 */}
          <Select
          
        options={cuisines}
        value={selectedCuisines}  // 单选时，value 只有一个选项
        onChange={handleCuisineChange}
        placeholder="搜尋餐廳 或 菜系"
        isSearchable // 允许搜索
        closeMenuOnSelect={true} // 选择后关闭菜单
        styles={customStyles} // 自定义样式
      />

      {/* React-Select 地区选择（单选） */}
      <Select
        options={regions}
        value={selectedRegions} // 单选时，value 只有一个选项
        onChange={handleRegionChange}
        placeholder="搜尋地區 或 地址"
        isSearchable // 允许搜索
        closeMenuOnSelect={true} // 选择后关闭菜单
        styles={customStyles} // 自定义样式
      />
        </div>
  );
}

export default SearchSh;
