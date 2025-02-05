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
    { value: "italian", label: "義式料理" },
    { value: "mexican", label: "墨西哥餐" },
    { value: "brunch", label: "早午餐" },
    { value: "小吃", label: "小吃" },
    { value: "bistro", label: "餐酒館" },
    { value: "bar", label: "酒吧" },
    { value: "date_night", label: "約會餐廳" },
    { value: "dessert", label: "甜點" },
    { value: "bbq", label: "燒肉" },
    { value: "izakaya", label: "居酒屋" },
    { value: "chinese", label: "中式料理" },
  ];

  // 模擬資料庫中的地區選項
  const regions = [
    { value: "taipei", label: "台北" },
    { value: "taoyuan", label: "桃園" },
    { value: "miaoli", label: "苗栗" },
    { value: "台中市", label: "台中市" },
    { value: "nantou", label: "南投" },
    { value: "kaohsiung", label: "高雄" },
    { value: "tainan", label: "台南" },
    { value: "pingtung", label: "屏東" },
    { value: "chiayi", label: "嘉義" },
    { value: "yunlin", label: "雲林" },
    { value: "yilan", label: "宜蘭" },
    { value: "zhanghua", label: "彰化" },
    { value: "hsinchu", label: "新竹" },
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
