import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


export default function Home() {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '20px' }}>
      <h1 style={{ fontSize: '36px', fontFamily: 'Arial, sans-serif',whiteSpace: 'nowrap'  }}>依地區搜尋餐廳</h1>
    </div>

    <ImageList style={{ maxWidth: '100%', height: '500px' }}
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
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ border: 'none' }} style={{ maxWidth: '248px', height: 'auto' }}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              display: 'block',
              width: '200px', // 設置統一寬度
              height: '100px', // 設置統一高度
              objectFit: 'cover', // 保持比例，裁剪多餘的部分
            }} />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below" />
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
