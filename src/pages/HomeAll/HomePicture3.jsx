import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React, { useState, useEffect } from "react";

export default function Home() {
const [itemData, setRecommendedRestaurant] = useState([]);
useEffect(() => {
  const HotRestaurant = async () => {
    const url = `http://localhost:8080/restaurants/list`;
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setRecommendedRestaurant(data.slice(0, 8));  // 更新餐廳列表
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  HotRestaurant();
}, []);  // 空依賴陣列表示只會在組件掛載時執行一次
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "10vh",
          paddingTop: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontFamily: "Arial, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          熱門餐廳
        </h1>
      </div>
      <ImageList
        style={{ maxWidth: "80%", height: "80%", padding: "30px" }}
        sx={{
          // width: 200px, height: 100px,
          overflow: "hidden", // 隱藏滾動條
          flexWrap: "wrap", // 讓圖片自動換行
          gap: 5, // 圖片間距
          margin: "0 auto",
          // padding: '100px 100px',
          display: "flex", // 使用 flexbox 居中
          justifyContent: "center", // 水平居中
          alignItems: "center", // 垂直居中

          // RWD 設置列數
          "@media (min-width: 1200px)": {
            cols: 4, // 大螢幕顯示 4 列
          },
          "@media (max-width: 1200px)": {
            cols: 3, // 中螢幕顯示 3 列
          },
          "@media (max-width: 768px)": {
            cols: 1, // 小螢幕顯示 1 列
          },
        }}
        cols={3}
        gap={15}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.image}
            sx={{
              border: "none",
              maxWidth: "248px",
              height: "auto",
              borderRadius: "5%",
              "&:hover": {
                transform: "scale(1.1)", // 當鼠標懸停時，輕微放大
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // 增加陰影效果
                cursor: "pointer", // 改變光標形狀，提示用戶可以點擊
                borderRadius: "5%",
              },
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // 增加平滑過渡效果
            }}
            onClick={() => handleCardClick(item.value)}
          >
            <img
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
              style={{
                display: "block",
                width: "200px", // 設置統一寬度
                height: "200px", // 設置統一高度
                objectFit: "cover", // 保持比例，裁剪多餘的部分
                borderRadius: "5%",
              }}
            />
            <ImageListItemBar
              title={item.name}
              position="below"
              sx={{
                display: "flex",
                justifyContent: "center", // 水平居中
                alignItems: "center", // 垂直居中
                fontSize: "24px", // 設置字體大小
                fontWeight: "bold", // 可選，設置字體加粗
                width: "100%", // 使區塊佔滿整個寬度
                textAlign: "center", // 確保文字居中對齊
                padding: "10px 0", // 可以調整內邊距來達到更好的視覺效果
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "金鼎大飯店",
//     author: "傳承經典的台灣傳統美味。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "鼎泰豐",
//     author: "精緻小籠包，口感鮮美，外脆內嫩。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "小南國",
//     author: "地道江南風味，經典本土佳餚。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "老林牛肉麵",
//     author: "鮮嫩牛肉，濃郁湯頭，暖心滋味。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "望海樓",
//     author: "風景優美，海鮮新鮮，餐點精緻。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "老虎塭",
//     author: "創意料理，挑戰你的味蕾極限。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "壽司禪",
//     author: "精緻日式料理，食材新鮮直送。",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "越南料理",
//     author: "高端奢華，細膩的法式料理體驗。",
//   },
  // {
  //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //   title: "泰式料理",
  //   author: "",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //   title: "西班牙料理",
  //   author: "",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //   title: "甜點",
  //   author: "",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //   title: "飲料",
  //   author: "",
  // },
// ];
