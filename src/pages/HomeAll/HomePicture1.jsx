import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function HomePicture1() {
  const navigate = useNavigate(); // 使用 navigate

  const handleCardClick = (value) => {
    console.log('P1 console log:',{itemData1:value});
    navigate('/SearchStore', { state: { itemData1: value } }); // 点击后跳转并传递 selectedCity
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '10vh', paddingTop: '20px' }}>
        <h1 style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap' }}>
          依地區搜尋餐廳
        </h1>
      </div>
      <ImageList style={{ maxWidth: '70%', height: '80%' }}
        sx={{
          overflow: 'hidden',
          flexWrap: 'wrap',
          gap: 5,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '@media (min-width: 1200px)': { cols: 4 },
          '@media (max-width: 1200px)': { cols: 3 },
          '@media (max-width: 768px)': { cols: 1 },
        }} cols={3} gap={10}>
        {itemData1.map((item) => (
          <ImageListItem key={item.img} sx={{ border: 'none' }} style={{ maxWidth: '248px', height: 'auto' }}
          onClick={() => handleCardClick(item.value)} // 点击事件
          >
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                display: 'block',
                width: '200px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '5%',
              }} />
            <ImageListItemBar
              title={item.title}
              position="below"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                width: '100%',
                textAlign: 'center',
                padding: '10px 0',
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
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '台北',value: "台北",
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: '桃園',value: "桃園",
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: '苗栗',value: "苗栗",
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: '台中',value: "台中",
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: '南投',value: "南投",
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: '高雄',value: "高雄",
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: '台南',value: "台南",
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: '屏東',value: "屏東",
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: '嘉義',value: "嘉義",
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: '雲林',value: "雲林",
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: '宜蘭',value: "宜蘭",
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: '新竹',value: "新竹",
  },
];
