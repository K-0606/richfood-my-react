import * as React from "react";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function HomePicture2() {
  const navigate = useNavigate(); // 使用 navigate

  const handleCardClick = (value) => {
    console.log("P2 console log:", { itemData2: value });
    navigate(`/search?region=&type=${value}`); // 點擊後跳轉到 /search/:region，region帶入菜系名稱
  };

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
          依菜系搜尋餐廳
        </h1>
      </div>
      <ImageList
        style={{ maxWidth: "80%", height: "80%", padding: "30px" }}
        sx={{
          overflow: "hidden", // 隱藏滾動條
          flexWrap: "wrap", // 讓圖片自動換行
          gap: 5, // 圖片間距
          margin: "0 auto",
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
        {itemData2.map((item) => (
          <ImageListItem
            key={item.img}
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
            onClick={() => handleCardClick(item.value)} // 點擊圖片時觸發 handleCardClick
          >
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
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
              title={item.title}
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

const itemData2 = [
  {
    img: "https://images.pexels.com/photos/1618872/pexels-photo-1618872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "火鍋",
    value: "火鍋",
  },
  {
    img: "https://images.pexels.com/photos/271715/pexels-photo-271715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "日式料理",
    value: "日式料理",
  },
  {
    img: "https://images.pexels.com/photos/6287486/pexels-photo-6287486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "義式料理",
    value: "義式料理",
  },
  {
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "墨西哥餐",
    value: "墨西哥餐",
  },
  {
    img: "https://images.pexels.com/photos/2272037/pexels-photo-2272037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "早午餐",
    value: "早午餐",
  },
  {
    img: "https://lh3.googleusercontent.com/qTQStAUeou4MY7ylidcsXIf59WN6zW33qZhp0sGSHEP4rJVdeKmNJmwmCMBYTGRtvwTjtSjgg2q4CdUwJrB0_uqUhBzhpQo=s200",
    title: "小吃",
    value: "小吃",
  },
  {
    img: "https://images.pexels.com/photos/1796698/pexels-photo-1796698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "餐酒館",
    value: "餐酒館",
  },
  {
    img: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "酒吧",
    value: "酒吧",
  },
  // {
  //   img: "https://images.pexels.com/photos/1375902/pexels-photo-1375902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   title: "燒肉",
  //   value: "燒肉",
  // },
  // {
  //   img: "https://images.pexels.com/photos/30522860/pexels-photo-30522860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   title: "甜點",
  //   value: "甜點",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //   title: "約會餐廳",
  //   value: "約會餐廳",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //   title: "居酒屋",
  //   value: "居酒屋",
  // },
];
