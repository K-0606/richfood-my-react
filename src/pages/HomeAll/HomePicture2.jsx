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
    img: "https://pixabay.com/get/g2fd1f3fc89d28b5c2a5c44cc0d1fa249f428b45ad8e7ee43a5bec8edb6f8ae73dff90b1f211af101a7d152f14331ae614a7763bbfc6b500feaf0fdafbac161f951ca8e07dcdb3121b3e9e2fcb5219c43_640.jpg",
    title: "火鍋",
    value: "火鍋",
  },
  {
    img: "https://pixabay.com/get/g1f11c7c945c377e8edaa6028ee9f7f62b8cc54e4ba4d9b494ec167d9040f50878f93d190e13e7d6604433571bd06ec2dca759dc00bd511c1b22bd2998213c0a5ffd0959a43539a325dacd4fd4e4ea985_640.jpg",
    title: "日式料理",
    value: "日式料理",
  },
  {
    img: "https://pixabay.com/get/gb54f3aa05a1dc22ebdfde018aad4c693336f72d128c85bfe90946f17bb66d255cf96786811499d028f86583f07ca6822aceb020d3dc748901bccbd4d22cae0c5d78f418e855e3ed27993f0f23e8faad4_640.jpg",
    title: "義式料理",
    value: "義式料理",
  },
  {
    img: "https://pixabay.com/get/g755ced894fa2149af35f46a69bf6ec599e4aa9fe5c37da68dd4f313a737be968956d26cbe0c967dd13a039903c7a4d810df47c78eeee0947f3dba63fe2e27115317df8428a0cdb1ee5302a784f920706_640.jpg",
    title: "墨西哥餐",
    value: "墨西哥餐",
  },
  {
    img: "https://pixabay.com/get/g6f1a3e11f4bd43446767dd471bc159012e4f0003acf15aee4645c123f0c3907ce25ce2233a1412ac17c5a501e07aa4a3d19effcd2fb56a5ee19e59e4a134c31743ced7f1715b03227d19659064d31fea_640.jpg",
    title: "早午餐",
    value: "早午餐",
  },
  {
    img: "https://pixabay.com/get/ge50450fa0019f2b1e95356d4396a6a6f12f97e32aec01bc05382d19e1453bd2b5e029c23a5b81e2f5515a04750076630ee80f74cafa1f292ad3ef22cc1e6d8099411bfe5a31a815e75bc1b02f77ff867_640.jpg",
    title: "小吃",
    value: "小吃",
  },
  {
    img: "https://pixabay.com/get/gac29015cc0679c1eb11bb9de7ca03bc0c0baf84b7c9cbf4e23585d6326b2067544794861abbd9765d8d7733b7d63a704df3b51ac8b624ec8e6677b8c1490ca047ecb545e1b0f15b3176dbfe631b2da03_640.jpg",
    title: "餐酒館",
    value: "餐酒館",
  },
  {
    img: "https://pixabay.com/get/g79beeeb67f8866209b62ac083a462cac584c6d9b61c0b55234c7dbe94b1032a58775228bfe49066cae2622a26ecf96b63d6b44cc10580a060d3fdf21d627050ff3683a272b541267111b29ff4520a036_640.jpg",
    title: "酒吧",
    value: "酒吧",
  },
  // {
  //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  //   title: "約會餐廳",
  //   value: "約會餐廳",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
  //   title: "甜點",
  //   value: "甜點",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  //   title: "燒肉",
  //   value: "燒肉",
  // },
  // {
  //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  //   title: "居酒屋",
  //   value: "居酒屋",
  // },
];
