import * as React from "react";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function HomePicture1() {
  const navigate1 = useNavigate(); // 使用 navigate
  // const handleCardClick = (value) => {
  //   console.log('P1 console log:',{itemData1:value});
  //   navigate1('/SearchStore', { state: { itemData1: value } }); // 点击后跳转并传递 selectedCity
  // };
  // 當用戶點擊卡片時，導航到 /search/:region
  const handleCardClick = (region) => {
    navigate1(`/search?region=${region}&type=`); // 使用查詢參數來導航
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
          依地區搜尋餐廳
        </h1>
      </div>
      <ImageList
        style={{ maxWidth: "80%", height: "80%", padding: "30px" }}
        sx={{
          overflow: "hidden",
          flexWrap: "wrap",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media (min-width: 1200px)": { cols: 4 },
          "@media (max-width: 1200px)": { cols: 3 },
          "@media (max-width: 768px)": { cols: 1 },
        }}
        cols={3}
        gap={18}
      >
        {itemData1.map((item) => (
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
            onClick={() => handleCardClick(item.value)} // 點擊後觸發導航
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
                // objectFit: "cover", // 保持比例，裁剪多餘的部分
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

const itemData1 = [
  {
    img: "https://pixabay.com/get/g7fb3d6daa6794d2d48d48a4822b4a30e17aa9c1e28a272d001d44da48e9705c103f0b186038bec9603640ffdcc00fadb1b7b17b809410dc8a1b4d3a1f7a964525e70f871ac31aa9bcc9b9b83680fedbe_640.jpg",
    title: "台北市",
    value: "台北市",
  },
  {
    img: "https://images.pexels.com/photos/21832653/pexels-photo-21832653.jpeg",
    title: "桃園市",
    value: "桃園",
  },
  {
    img: "https://images.pexels.com/photos/19700108/pexels-photo-19700108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "苗栗",
    value: "苗栗",
  },
  {
    img: "https://images.pexels.com/photos/1003611/pexels-photo-1003611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "台中",
    value: "台中市",
  },
  {
    img: "https://images.pexels.com/photos/6865354/pexels-photo-6865354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "南投",
    value: "南投",
  },
  {
    img: "https://images.pexels.com/photos/19998095/pexels-photo-19998095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "高雄",
    value: "高雄",
  },
  {
    img: "https://pixabay.com/get/g52cd57f32ac2b5619033744b89b179322f8b1435871fba0d7923e5416963a0674993641888b33c4c05b863c8e91ef368c2c15ee086a1d5e55ccdaec086f748a5f36bb09cf0f17309152c8de7b41f23b4_640.jpg",
    title: "台南",
    value: "台南",
  },
  {
    img: "https://pixabay.com/get/g48b01486430c23e6c3989cf0ca3ae71ddb0797d3e7aebe6d9ad46ace6585b99bfbc92b2cd593f2f3676f046cc88f739040779d3a7928e53c6978fafd06ca40e5ce9b0ff77b523e5787b22291944c4a4f_640.jpg",
    title: "屏東",
    value: "屏東",
  },
  // {
  //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //   title: "嘉義",
  //   value: "嘉義",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //   title: "雲林",
  //   value: "雲林",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //   title: "宜蘭",
  //   value: "宜蘭",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //   title: "新竹",
  //   value: "新竹",
  // },
];
