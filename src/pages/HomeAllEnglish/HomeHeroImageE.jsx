import React, { useState } from "react";
import Select from "react-select";
import './HomeHeroImageE.css'; // 引入樣式檔案

function HomeHeroImage() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  // 菜系選項
  const cuisines = [
    { value: "chinese", label: "chinese" },
    { value: "japanese", label: "japanese" },
    { value: "italian", label: "italian" },
    { value: "mexican", label: "mexican" },
  ];

  // 地區選項
  const regions = [
    { value: "taipei", label: "taipei" },
    { value: "taichung", label: "taichung" },
    { value: "kaohsiung", label: "kaohsiung" },
    { value: "taiwan", label: "taiwan" },
    { value: "new-york", label: "new-york" },
    { value: "paris", label: "paris" },
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
      borderRadius: "100px"
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      padding: "8px",
      width: "380px",
      borderRadius: "100px"
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      color: "#747677",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "20px", // 下拉菜單外框的圓角
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
        <h1 className="title">Discover delicious food and make reservations</h1>

        <div className="select-container">
          {/* React-Select 菜系選擇 */}
          <Select className="cta-button-e" 
            isMulti
            options={cuisines}
            value={selectedCuisines}
            onChange={handleCuisineChange}
            placeholder="Search for a restaurant or category"
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
            placeholder="Search Area or Address"
            isSearchable // 允許搜索
            closeMenuOnSelect={false} // 保持下拉菜單開啟
            components={{
              // DropdownIndicator: () => null,
              MultiValueRemove: ({ data }) => (
                <button className="cta-button-e" 
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
