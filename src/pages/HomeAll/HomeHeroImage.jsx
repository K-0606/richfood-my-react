import React, { useState } from "react";
// import Select from "react-select";
import './HomeHeroImage.css'; // 引入樣式檔案

function HomeHeroImage() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

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
    { value: "taiwan", label: "台灣" },
    { value: "new-york", label: "紐約" },
    { value: "paris", label: "巴黎" },
  ];

  // 處理菜系選擇
  const handleCuisineChange = (selectedOptions) => {
    setSelectedCuisines(selectedOptions || []);
  };

  // 處理地區選擇
  const handleRegionChange = (selectedOptions) => {
    setSelectedRegions(selectedOptions || []);
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
    multiValueRemove: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      color: "#747677",
      cursor: "pointer",
    }),
  };

  return (
    <div className="hero-container">
      <img
        src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"  
        alt="Homepage Hero"
        className="hero-image"
      />
      <div className="hero-overlay">
        <h1>探索美味並預定餐廳</h1>

        <div className="select-container">
          {/* React-Select 菜系選擇 */}
          <Select className="cta-button" 
            isMulti
            options={cuisines}
            value={selectedCuisines}
            onChange={handleCuisineChange}
            placeholder="搜尋餐廳 或 菜系"
            isSearchable // 允許搜索
            closeMenuOnSelect={false} // 保持下拉菜單開啟
            components={{
              // DropdownIndicator: () => null, 
              MultiValueRemove: ({ data }) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 防止選項被選中
                    setSelectedCuisines((prev) => prev.filter((item) => item.value !== data.value));
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#747677",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              ),
            }}
            allowCreate // 允許手動輸入並創建新的選項
            styles={customStyles} 
          />

          {/* React-Select 地區選擇 */}
          <Select
            isMulti
            options={regions}
            value={selectedRegions}
            onChange={handleRegionChange}
            placeholder="搜尋地區 或 地址"
            isSearchable // 允許搜索
            closeMenuOnSelect={false} // 保持下拉菜單開啟
            components={{
              // DropdownIndicator: () => null,
              MultiValueRemove: ({ data }) => (
                <button className="cta-button" 
                  onClick={(e) => {
                    e.stopPropagation(); // 防止選項被選中
                    setSelectedRegions((prev) => prev.filter((item) => item.value !== data.value));
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#747677",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              ),
            }}
            allowCreate // 允許手動輸入並創建新的選項
            styles={customStyles} 
          />
        </div>
      </div>
    </div>
  );
}

export default HomeHeroImage;
