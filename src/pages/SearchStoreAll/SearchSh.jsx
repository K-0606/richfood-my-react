import React, { useState } from "react";
import Select from "react-select";
import "./SearchSh.css"; // 引入樣式檔案

function SearchSh() {
  const [selectedCuisines, setSelectedCuisines] = useState([null]);
  const [selectedRegions, setSelectedRegions] = useState([null]);
  const [inputValueCuisine, setInputValueCuisine] = useState("");
  const [inputValueRegion, setInputValueRegion] = useState("");

  // 菜系選項
  const cuisines = [
    { value: "hotpot", label: "火鍋" },
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

  // 模擬搜尋資料庫，根據使用者輸入的關鍵字來篩選菜系
  const filterCuisines = (inputValue) => {
    return cuisines.filter((cuisine) =>
      cuisine.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // 模擬搜尋資料庫，根據使用者輸入的關鍵字來篩選地區
  const filterRegions = (inputValue) => {
    return regions.filter((region) =>
      region.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // 處理菜系選擇
  const handleCuisineChange = (selectedOptions) => {
    // 保證只有選擇一個選項
    setSelectedCuisines(selectedOptions ? [selectedOptions] : []);
    search(selectedOptions ? [selectedOptions] : [], selectedRegions);
  };

  // 處理地區選擇
  const handleRegionChange = (selectedOptions) => {
    // 保證只有選擇一個選項
    setSelectedRegions(selectedOptions ? [selectedOptions] : []);
    search(selectedCuisines, selectedOptions ? [selectedOptions] : []);
  };

  // 處理手動輸入的菜系
  const handleCuisineInputChange = (newValue) => {
    setInputValueCuisine(newValue); // 更新輸入的值
  };

  // 處理手動輸入的地區
  const handleRegionInputChange = (newValue) => {
    setInputValueRegion(newValue); // 更新輸入的值
  };
  // 處理 Enter 鍵觸發搜尋
  const handleKeyDown = (e, isCuisine) => {
    if (e.key === "Enter") {
      if (isCuisine) {
        // 處理菜系搜尋
        search(
          [{ label: inputValueCuisine, value: inputValueCuisine }],
          selectedRegions
        );
      } else {
        // 處理地區搜尋
        search(selectedCuisines, [
          { label: inputValueRegion, value: inputValueRegion },
        ]);
      }
    }
  };

  // 搜尋函數，根據菜系和地區來搜尋
  const search = (cuisines, regions) => {
    // 確保輸入的 cuisines 和 regions 是有效的數組
    const selectedCuisineValues = Array.isArray(cuisines)
      ? cuisines.map((cuisine) => cuisine.value)
      : [];
    const selectedRegionValues = Array.isArray(regions)
      ? regions.map((region) => region.value)
      : [];

    console.log("搜尋菜系:", selectedCuisineValues);
    console.log("搜尋地區:", selectedRegionValues);

    // 這裡可以連接後端，發送請求並顯示結果
    // 假設我們有一個 API 查詢的函數
    // fetchData(selectedCuisineValues, selectedRegionValues);
  };

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
    multiValueRemove: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      color: "#747677",
      cursor: "pointer",
    }),
  };
  // 发送数据到API
  const sendDataToAPI = async () => {
    const data = {
      cuisine: selectedCuisines?.label || "", // 使用 optional chaining 简化判断
      region: selectedRegions?.label || "", // 使用 optional chaining 简化判断
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

  return (
    <div className="select-container">
      {/* React-Select 菜系選擇 */}
      <div>
        <Select
          className="cta-button"
          isMulti={false} // 禁止多選，只能選一個
          options={filterCuisines(inputValueCuisine)}
          value={selectedCuisines}
          onChange={handleCuisineChange}
          onInputChange={handleCuisineInputChange} // 當用戶輸入時觸發
          onKeyDown={(e) => handleKeyDown(e, true)} // 監聽 Enter 鍵
          placeholder="搜尋餐廳 或 菜系"
          isSearchable
          closeMenuOnSelect={false}
          components={{
            MultiValueRemove: ({ data }) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCuisines([]); // 清空菜系選擇
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
          allowCreate
          styles={customStyles}
        />

        {/* React-Select 地区选择（单选） */}
        <Select
          isMulti={false} // 禁止多選，只能選一個
          options={filterRegions(inputValueRegion)}
          value={selectedRegions}
          onChange={handleRegionChange}
          onInputChange={handleRegionInputChange} // 當用戶輸入時觸發
          onKeyDown={(e) => handleKeyDown(e, false)} // 監聽 Enter 鍵
          placeholder="搜尋地區 或 地址"
          isSearchable
          closeMenuOnSelect={false}
          components={{
            MultiValueRemove: ({ data }) => (
              <button
                className="cta-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRegions([]); // 清空地區選擇
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
          allowCreate
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default SearchSh;
