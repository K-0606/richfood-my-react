import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Carousel } from 'react-responsive-carousel'; // 引入轮播图库
import Typography from '@mui/material/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 引入轮播图样式





// 使用 MUI 的 Paper 和 styled 创建样式化的 Item
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '8px',  // 圆角效果
  transition: 'all 0.3s ease',  // 添加平滑过渡效果
  cursor: 'pointer', // 鼠标指针样式
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // 鼠标悬浮时改变背景色
    transform: 'scale(1.1)', // 鼠标悬浮时放大
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // 添加阴影效果
    
  },
}));

// 轮播图组件
const ImageCarousel = ({ Restaurant }) => (
  <Carousel 
    infiniteLoop 
    showStatus={false}
    swipeable={true}
    dynamicHeight={true} //高度根据每一张图片实际高度动态调整
  >
    <div>
      <img src={Restaurant.image} alt="Image 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="Image 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="Image 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="Image 5" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
    </div>
  </Carousel>
);

export default function BStorePage1() {
  const [Restaurant, setRestaurant]= useState([]);

//fetch API
const fetchData = async () => {
  
  let url = "http://localhost:8080/restaurants/1";   

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();    
    setRestaurant(data);
  } catch (error) {
    console.error("Error fetching data:", error);

  }
};
  useEffect(() => {
    fetchData().then(() => {
      console.log(Restaurant);  // 檢查回傳的資料
    });
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',  // 水平居中
      alignItems: 'center',      // 垂直居中
      width: '100%', 
      height: '100vh',  // 使容器占满整个视口高度
      marginTop: '-50px',  // 使整体布局有一些空隙
    }} style={{ height: '100vh' }}>
      {/* 轮播图部分 */}
      <Box sx={{ 
        width: '500px',  
        height: '500px', 
        marginRight: 5 
      }}>
        <ImageCarousel Restaurant={Restaurant}/>
      </Box>

      {/* Stack 部分 */}
      <Stack spacing={2} 
        sx={{ 
          width: '300px',
          position: 'relative', 
          top: '-55px', // 上移 20px
          // alignItems: 'flex-start',  // 左对齐 Stack 内部的元素
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>{Restaurant.name}</Typography> 
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>平均消費：{Restaurant.average}</Typography> 
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>地址：{Restaurant.country}{Restaurant.district}{Restaurant.address}</Typography> 
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>電話：{Restaurant.phone}</Typography> 
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>店家媒體：</Typography> 
        <Item>預約</Item>
        <Item>評論</Item>
      </Stack>
    </Box>
  );
}
