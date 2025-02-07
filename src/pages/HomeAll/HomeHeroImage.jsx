import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import "./HomeHeroImage.css"; // 引入樣式檔案

function HomeHeroImage() {
  const navigate = useNavigate(); // 使用 navigate

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [inputValueCuisine, setInputValueCuisine] = useState("");
  const [inputValueRegion, setInputValueRegion] = useState("");

  // 模擬資料庫中的菜系選項
  const cuisines = [
    { value: "火鍋", label: "火鍋" },
    { value: "日式料理", label: "日式料理" },
    { value: "義式料理", label: "義式料理" },
    { value: "墨西哥餐", label: "墨西哥餐" },
    { value: "早午餐", label: "早午餐" },
    { value: "小吃", label: "小吃" },
    { value: "餐酒館", label: "餐酒館" },
    { value: "酒吧", label: "酒吧" },
    { value: "約會餐廳", label: "約會餐廳" },
    { value: "甜點", label: "甜點" },
    { value: "燒肉", label: "燒肉" },
    { value: "居酒屋", label: "居酒屋" },
    { value: "中式料理", label: "中式料理" },
  ];

  // 模擬資料庫中的地區選項
  const regions = [
    { value: "台北市", label: "台北市" },
    { value: "桃園市", label: "桃園市" },
    { value: "苗栗縣", label: "苗栗縣" },
    { value: "台中市", label: "台中市" },
    { value: "南投縣", label: "南投縣" },
    { value: "高雄市", label: "高雄市" },
    { value: "台南市", label: "台南市" },
    { value: "屏東市", label: "屏東市" },
    { value: "嘉義市", label: "嘉義市" },
    { value: "雲林縣", label: "雲林縣" },
    { value: "宜蘭縣", label: "宜蘭縣" },
    { value: "彰化市", label: "彰化市" },
    { value: "新竹市", label: "新竹市" },
  ];

  // 處理菜系選擇
  const handleCuisineChange = (selectedOptions) => {
    setSelectedCuisines(selectedOptions ? [selectedOptions] : []);
    navigateToSearch(selectedOptions ? [selectedOptions] : [], selectedRegions);
  };

  // 處理地區選擇
  const handleRegionChange = (selectedOptions) => {
    setSelectedRegions(selectedOptions ? [selectedOptions] : []);
    navigateToSearch(selectedCuisines, selectedOptions ? [selectedOptions] : []);
  };

  // 處理手動輸入的菜系
  const handleCuisineInputChange = (newValue) => {
    setInputValueCuisine(newValue);
  };

  // 處理手動輸入的地區
  const handleRegionInputChange = (newValue) => {
    setInputValueRegion(newValue);
  };

  // 根據選擇的菜系和地區導航
  const navigateToSearch = (cuisines, regions) => {
    const cuisineValues = cuisines.length ? cuisines.map((cuisine) => cuisine.value).join(",") : "";
    const regionValues = regions.length ? regions.map((region) => region.value).join(",") : "";

    // 拼接 URL 並導航
    navigate(`/search?region=${regionValues}&type=${cuisineValues}&price=&popular=false`);
  };

  // 自定義樣式
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "transparent",
      color: state.isFocused ? "#000" : "#333",
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      padding: "5px",
      width: "300px",
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
          <Select
            className="cta-button"
            isMulti={false}
            options={cuisines}
            value={selectedCuisines}
            onChange={handleCuisineChange}
            onInputChange={handleCuisineInputChange}
            placeholder="搜尋餐廳 或 菜系"
            isSearchable={true}
            styles={customStyles}
          />

          {/* React-Select 地區選擇 */}
          <Select
            isMulti={false}
            options={regions}
            value={selectedRegions}
            onChange={handleRegionChange}
            onInputChange={handleRegionInputChange}
            placeholder="搜尋地區 或 地址"
            isSearchable={true}
            styles={customStyles}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeHeroImage;
