import { height, width } from "@mui/system";
import React, { useState, useEffect } from "react";

const getPriceLabel = (range) => {
  switch (range) {
    case "below100":
      return "100$以下";
    case "100to300":
      return "100$~300$";
    case "300to500":
      return "300$~500$";
    case "500to1000":
      return "500$~1000$";
    case "1000to2000":
      return "1000$~2000$";
    case "above2000":
      return "2000$以上";
    default:
      return "";
  }
};

const SearchBar = ({ onSearchChange, searchParams }) => {
  const [safeSearchParams, setSafeSearchParams] = useState({
    type: searchParams?.type || [],
    region: searchParams?.region || [],
    price: searchParams?.price || [],
    popular: searchParams?.popular || false,
  });

  const handlePopularChange = () => {
    onSearchChange("popular", !safeSearchParams.popular);
  };

  const handlePriceChange = (event) => {
    const { value, checked } = event.target;

    // 如果選擇了這個範圍，且該範圍已經選擇過，則取消選擇
    if (!checked) {
      onSearchChange("price", []); // 取消選擇，將價格範圍清空
      return;
    }

    // 如果是選擇新範圍，只能選一個，清除原來的範圍並設置新的範圍
    onSearchChange("price", [value]);
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    let newType = [...safeSearchParams.type];

    if (newType.includes(value)) {
      newType = []; // 如果已經選擇過，取消選擇並顯示所有餐廳
    } else {
      newType = [value]; // 只選擇這一個類型
    }

    onSearchChange("type", newType); // 更新過濾條件
  };

  const handleRegionChange = (event) => {
    const { value } = event.target;
    let newRegion = value;

    if (safeSearchParams.region === value) {
      newRegion = ""; // 如果已經選擇過，則取消選擇並顯示所有餐廳
    }

    onSearchChange("region", newRegion); // 更新過濾條件
  };

  // 更新過濾條件時，`safeSearchParams` 會反映並同步到 `SearchBar`
  useEffect(() => {
    setSafeSearchParams({
      ...safeSearchParams,
      type: searchParams.type || [],
      region: searchParams.region || [],
      price: searchParams.price || [],
      popular: searchParams.popular || false,
    });
  }, [searchParams]);

  return (
    <div style={styles.searchBarContainer}>
      {/* 餐廳類型選擇區塊 */}
      <div style={styles.filterGroup}>
        <h4 style={styles.filterTitle}>餐廳類型</h4>
        <div style={styles.optionsContainer}>
          {restaurantTypes.map((type) => (
            <label key={type} style={styles.optionLabel}>
              <input
                type="checkbox"
                value={type}
                checked={safeSearchParams.type.includes(type)}
                onChange={handleTypeChange}
                style={styles.checkbox}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* 地區選擇區塊 */}
      <div style={styles.filterGroup}>
        <h4 style={styles.filterTitle}>地區選擇</h4>
        <div style={styles.optionsContainer}>
          {regions.map((region) => (
            <label key={region} style={styles.optionLabel}>
              <input
                type="checkbox"
                value={region}
                checked={safeSearchParams.region === region}
                onChange={handleRegionChange}
                style={styles.checkbox}
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      {/* 價格篩選區塊 */}
      <div style={styles.filterGroup}>
        <h4 style={styles.filterTitle}>依據價格篩選</h4>
        <div style={styles.optionsContainer}>
          {[
            "below100",
            "100to300",
            "300to500",
            "500to1000",
            "1000to2000",
            "above2000",
          ].map((range) => (
            <label key={range} style={styles.optionLabel}>
              <input
                type="checkbox"
                value={range}
                checked={safeSearchParams.price.includes(range)}
                onChange={handlePriceChange}
                style={styles.checkbox}
              />
              {getPriceLabel(range)}
            </label>
          ))}
        </div>
      </div>

      {/* 最受歡迎餐廳選擇 */}
      <div style={styles.filterGroup}>
        <label style={styles.optionLabel}>
          <input
            type="checkbox"
            checked={safeSearchParams.popular}
            onChange={handlePopularChange}
            style={styles.checkbox}
          />
          顯示最受歡迎餐廳（4顆星以上）
        </label>
      </div>
    </div>
  );
};

const styles = {
  searchBarContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "	#E0E0E0",
    width: "80%",
    height: "auto",
    marginLeft: "auto", // 自動調整左邊距離
    marginRight: "auto", // 自動調整右邊距離
    // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  filterGroup: {
    marginBottom: "20px",
    padding: "5px",
  },
  filterTitle: {
    fontSize: "1.1em",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "40px",
  },
  optionsContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1em",
    color: "#555",
    margin: "5px 0",
    width: "130px",
    height: "10px",
    textAlign: "center",
    padding: "8px 0",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  checkbox: {
    marginRight: "10px",
  },
};

const restaurantTypes = [
  "火鍋",
  "小吃",
  "酒吧",
  "甜點",
  "燒肉",
  "居酒屋",
  "早午餐",
  "約會餐廳",
  "日式料理",
  "義式料理",
  "墨西哥餐",
  "中式料理",
];

const regions = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "彰化縣",
  "南投縣",
  "嘉義市",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "屏東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

export default SearchBar;
