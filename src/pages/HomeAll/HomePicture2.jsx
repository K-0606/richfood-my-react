import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


export default function HomePicture2() {
  const navigate = useNavigate(); // 使用 navigate

  const handleCardClick = (value) => {
    console.log('P1 console log:',{itemData2:value});
    navigate('/SearchStore', { state: { itemData2: value } }); // 点击后跳转并传递 selectedCity
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '10vh', paddingTop: '20px' }}>
        <h1 style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
        依菜系搜尋餐廳
        </h1>
      </div>
    <ImageList style={{ maxWidth: '70%', height: '80%' }}
      sx={{
        // width: 200px, height: 100px,
        overflow: 'hidden', // 隱藏滾動條
        flexWrap: 'wrap', // 讓圖片自動換行
        gap: 5, // 圖片間距
        margin: '0 auto',
        // padding: '100px 100px',
        display: 'flex', // 使用 flexbox 居中
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中


        // RWD 設置列數
        '@media (min-width: 1200px)': {
          cols: 4, // 大螢幕顯示 4 列
        },
        '@media (max-width: 1200px)': {
          cols: 3, // 中螢幕顯示 3 列
        },
        '@media (max-width: 768px)': {
          cols: 1, // 小螢幕顯示 1 列
        },
      }} cols={3} gap={10}>
      {itemData2.map((item) => (
        <ImageListItem key={item.img} sx={{ border: 'none' }} style={{ maxWidth: '248px', height: 'auto' }}
        onClick={() => handleCardClick(item.value)} 
        >
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              display: 'block',
              width: '200px', // 設置統一寬度
              height: '200px', // 設置統一高度
              objectFit: 'cover', // 保持比例，裁剪多餘的部分
              borderRadius: '5%',
            }} />
          <ImageListItemBar
              title={item.title}
              position="below"
              sx={{
                display: 'flex',
                justifyContent: 'center', // 水平居中
                alignItems: 'center', // 垂直居中
                fontSize: '24px', // 設置字體大小
                fontWeight: 'bold', // 可選，設置字體加粗
                width: '100%', // 使區塊佔滿整個寬度
                textAlign: 'center', // 確保文字居中對齊
                padding: '10px 0', // 可以調整內邊距來達到更好的視覺效果
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
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '火鍋',value: "火鍋"
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: '日式料理',value: "日式料理"
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: '義式料理',value: "義式料理"
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: '墨西哥餐',value:  "墨西哥餐"
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: '早午餐',value: "早午餐"
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: '小吃',value: "小吃"
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: '餐酒館',value: "餐酒館"
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: '酒吧',value: "酒吧"
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: '約會餐廳',value: "約會餐廳"
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: '甜點',value:  "甜點"
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: '燒肉',value: "燒肉"
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: '居酒屋',value: "居酒屋"
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: '中式料理', value: "中式料理"
  },
];
