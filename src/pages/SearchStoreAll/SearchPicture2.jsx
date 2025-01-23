//餐廳菜系及地區的SearchBox跟CheackBox連動
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@mui/material";
import Select from "react-select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Star from "@mui/icons-material/Star";
import "./SP2.css";

const SearchPicture2 = () => {
  const { state } = useLocation(); // 获取传递过来的 state 数据
  const [restaurantId, setRestaurant] = useState([]);
  const [page, setPage] = useState([]);
  const [checkedCuisine, setCheckedCuisine] = useState(null); // 用來追蹤勾選的菜系
  const [checkedRegion, setCheckedRegion] = useState(null); // 用來追蹤勾選的地區
  const [selectedCuisines, setSelectedCuisines] = useState(null); // 用來追蹤菜系的Select選擇
  const [selectedRegions, setSelectedRegions] = useState(); // 用來追蹤地區的Select選擇 state?.selectedRegions || ''
  // const [page, setPage] = useState(1); // 記錄當前頁數
  // const [totalPages, setTotalPages] = useState(1); // 記錄總頁數
  const { itemData1 } = state || {}; // 確保 itemData1 正確接收到
  const { itemData2 } = state || {}; // 確保 itemData1 正確接收到
  console.log("接收到的 state:", state);

  const navigate2 = useNavigate(); // 使用 navigate 跳转
  const handleCardClick = (restaurantId) => {
    console.log("SP1 console log:", { restaurant: restaurantId });
    navigate2("/StorePage", { state: { restaurant: restaurantId } }); // 传递餐厅数据到目标页面
  };

  // 发送数据到API
  const fetchData = async (country = null, category = null) => {
    let url = "http://localhost:8080/restaurants";
    // 动态构造路径部分
    const countryLabel =
      country && typeof country === "object" ? country.label : country;
    const categoryLabel =
      category && typeof category === "object" ? category.label : category;

    if (countryLabel && categoryLabel) {
      url += `/${countryLabel}/list/${categoryLabel}`;
    } else if (countryLabel) {
      url += `/${countryLabel}/list`;
    } else if (categoryLabel) {
      url += `/list/${categoryLabel}`;
    } else {
      url += "/list";
    }
    console.log(countryLabel);
    console.log(categoryLabel);

    // // 将筛选条件（filters）添加为查询字符串
    // const params = new URLSearchParams(filters).toString();

    // // 如果有查询参数，将其附加到 URL
    // if (params) {
    //   url += `?${params}`;
    // }

    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setRestaurant(data.content);
      console.log(data.content);
      setPage(data.page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // 跳轉更新菜系選擇
    const selectedCuisine = cuisines.find(
      (cuisine) => cuisine.label === itemData2
    );
    setCheckedCuisine(itemData2);
    setSelectedCuisines(selectedCuisine);
    console.log(`勾選的菜系: ${itemData2}`);
    fetchData(checkedRegion, itemData2);

    // 跳轉更新地區選擇
    setCheckedRegion(itemData1); // 更新地區勾選
    const selectedRegion = regions.find((region) => region.label === itemData1);
    setSelectedRegions(selectedRegion);
    fetchData(itemData1, checkedCuisine);

    // fetchData(); // 初始加载，获取所有餐厅
  }, []);

  //{---------餐廳----------}
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
  // Checkbox 勾選菜系變更處理
  const handleCuisineCheckboxChange = (event) => {
    const { checked, name } = event.target;

    console.log(
      `Cuisine Checkbox changed - Name: ${name}, Checked: ${checked}`
    );

    if (checked) {
      const selectedCuisine = cuisines.find(
        (cuisine) => cuisine.label === name
      );
      setCheckedCuisine(name);
      setSelectedCuisines(selectedCuisine); // 更新Select菜系
      console.log(`勾選的菜系: ${name}`);
      fetchData(checkedRegion, name);
    } else {
      setCheckedCuisine(null);
      setSelectedCuisines(null);
      console.log(`取消勾選的菜系: ${name}`);
      fetchData(checkedRegion, null);
    }
  };

  // Select 改變菜系時處理
  const handleCuisineSelectChange = (selectedOption) => {
    console.log(
      `Cuisine Select changed - Selected option: ${
        selectedOption ? selectedOption.label : "None"
      }`
    );
    setSelectedCuisines(selectedOption);
    setCheckedCuisine(selectedOption ? selectedOption.label : null);
    fetchData(selectedRegions, selectedOption ? selectedOption.label : null);
  };
  //{---------地區----------}
  const regions = [
    { value: "taipei", label: "台北" },
    { value: "taoyuan", label: "桃園" },
    { value: "miaoli", label: "苗栗" },
    { value: "taichung", label: "臺中市" },
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

  // Checkbox 勾選地區變更處理
  const handleRegionCheckboxChange = (event) => {
    const { checked, name } = event.target;

    console.log(`Region Checkbox changed - Name: ${name}, Checked: ${checked}`);

    if (checked) {
      const selectedRegion = regions.find((region) => region.label === name);
      setCheckedRegion(name);
      setSelectedRegions(selectedRegion); // 更新Select地區
      console.log(`勾選的地區: ${name}`);
      fetchData(name, checkedCuisine);
    } else {
      setCheckedRegion(null);
      setSelectedRegions(null);
      console.log(`取消勾選的地區: ${name}`);
      fetchData(null, checkedCuisine);
    }
  };

  // Select 改變地區時處理
  const handleRegionSelectChange = (selectedOption) => {
    console.log(
      `Region Select changed - Selected option: ${
        selectedOption ? selectedOption.label : "None"
      }`
    );
    setSelectedRegions(selectedOption);
    setCheckedRegion(selectedOption ? selectedOption.label : null);
    fetchData(selectedOption ? selectedOption.label : null, selectedCuisines);
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
      minWidth: "300px", // 确保最小宽度是 300px
      maxWidth: "300px", // 限制最大宽度为 300px
      overflow: "hidden", // 防止溢出
    }),
    singleValue: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      color: "#747677",
      cursor: "pointer",
    }),
  };
  // const restaurantId = Array(10).fill({
  //       title: 'Lizard',
  //       description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
  //       image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  //     });

  return (
    <div>
      {/* React-Select 菜系選擇 */}
      <div className="select-container">
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
      <div className="my-Checkbox">
        <h2
          style={{
            transform: "translateX(100px)",
            marginTop: "20px",
            color: "gray",
          }}
        >
          餐廳選擇
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            transform: "translateX(100px)",
            width: "130px",
          }}
        >
          {cuisines.map((cuisine) => (
            <FormControlLabel
              key={cuisine.value}
              control={
                <Checkbox
                  checked={checkedCuisine === cuisine.label}
                  onChange={handleCuisineCheckboxChange}
                  name={cuisine.label}
                />
              }
              label={cuisine.label}
              // sx={{
              //   "@media (max-width: 1200px)": {
              //     display: "none", // 1200px 以下屏幕隐藏 checkbox
              //   },
              // }}
            />
          ))}
        </div>

        {/* 包裹地區選擇的 Checkbox */}
        <h2
          style={{
            transform: "translateX(100px)",
            marginTop: "20px",
            color: "gray",
          }}
        >
          地區選擇
        </h2>
        <div
          style={{
            // display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            transform: "translateX(100px)",
            width: "130px",
          }}
        >
          {regions.map((region) => (
            <FormControlLabel
              key={region.value}
              control={
                <Checkbox
                  checked={checkedRegion === region.label}
                  onChange={handleRegionCheckboxChange}
                  name={region.label}
                />
              }
              label={region.label}
            />
          ))}
        </div>
      </div>

      {/* Card section on the right */}
      <Box
        className="CardBox"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
          height: "300vh",
        }}
      >
        {restaurantId.map((restaurantId, index) => (
          <Card
            key={index}
            sx={{
              width: "600px",
              height: "25ß0px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            onClick={() => handleCardClick(restaurantId)}
          >
            <CardActionArea>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {/* Card Image */}
                <CardMedia
                  component="img"
                  sx={{ width: 200, height: 250 }}
                  image={restaurantId.image}
                  alt="green iguana"
                />
                {/* Card Content */}
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: 2,
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurantId.name}
                  </Typography>
                  {/* 評分 */}
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>評分:</strong> {restaurantId.rating}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          color: i < restaurantId.rating ? "gold" : "gray",
                          fontSize: "20px",
                        }}
                      />
                    ))}
                  </Box>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>平均消費:</strong> {restaurantId.average}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {restaurantId.description}
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Pagination
          count={page.totalPages}
          // count={totalPages} // 动态设置页数
          // page={page} // 当前页数
          // onChange={handleChange} // 页数变化时更新当前页
        />
      </Stack>
    </div>
  );
};

export default SearchPicture2;
