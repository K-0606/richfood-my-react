import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Paper, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { data } from 'react-router-dom';

// 创建一个样式化的 Item
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '65px', // 设置 Item 高度
  width: '65px',  // 设置 Item 宽度
  display: 'flex', // 保证 Item 内容居中
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer', // 给 Item 添加手形光标，表示可以点击
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // 使 Item 在悬浮时显示效果
  },
}));

// Google地图组件
const MapComponent = () => {
  const mapStyles = {
    height: "300px",  // 设置地图容器的高度
    width: "400px",   // 设置地图容器的宽度
    padding: "20px",
  };

  const defaultCenter = {
    lat: 25.0330,  // 修改为你的店铺的经纬度
    lng: 121.5654, // 修改为你的店铺的经纬度
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* 替换为你的 Google API 密钥 */}
      <GoogleMap
        mapContainerStyle={mapStyles}  // 使用上面定义的地图样式
        center={defaultCenter} // 地图中心位置
        zoom={14} // 缩放级别
      >
        {/* 添加标记 */}
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default function StorePage() {
  // 只保留3个卡片
  // const cards = [
  //   {
  //     title: 'Lizard 1',
  //     description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
  //     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  //   },
  //   {
  //     title: 'Lizard 2',
  //     description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
  //     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  //   },
  //   {
  //     title: 'Lizard 3',
  //     description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
  //     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  //   },
  // ];
      const [cards, setCards] = useState([]);
      useEffect(()=>{
        //頁面做好這邊要修改
        // const params = new URLSearchParams(window.location.search);
        // const storeIdParam = params.get('storeId');
        // setStoreId(storeIdParam);

        // fetch(`http://localhost:8080/coupons/selectCoupon?storeId=${storeIdParam}`)
        fetch(`http://localhost:8080/coupons/selectCoupon?storeId=4`)
        .then((res)=>{
          if(!res.ok){
            throw new Error("no response");
          }
          return res.json();
        })
        .then((data)=>{
          const limitedCards=data.slice(0,3);
          setCards(limitedCards);
        })
        .catch((error)=>{
          console.log(error);
        })
      },[]);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',  // 水平居中
      alignItems: 'center',      // 垂直居中
      width: '100%', 
      height: '100vh',  // 使容器占满整个视口高度
      marginTop: '-250px',  // 使整体布局有一些空隙
      gap: 3,
    }}>
      {/* Google地图部分 */}
      <Box sx={{ 
        width: '400px',  
        height: '400px',
        padding: '20px', 
        boxSizing: 'border-box',
        display: 'flex',  
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative', 
      }}>
        <MapComponent />
      </Box>

      {/* 卡片部分 */}
      <Box sx={{ 
        width: '400px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3.5,
        padding: '20px', 
      }}>
        {/* 渲染3个卡片 */}
        {cards.map((card, index) => (
          <Box key={index} sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', // 确保卡片在左侧排列
            alignItems: 'center', 
            gap: 2,
          }}>
            {/* Card */}
            <Card sx={{ 
              maxWidth: '300px', 
              height: '100px', 
              display: 'flex', 
              justifyContent: 'flex-start' 
            }}>
              <CardActionArea>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '300px' }}>
                  {/* Card Image */}
                  <CardMedia
                    component="img"
                    sx={{ width: '100px', height: '100px' }}
                    image={card.image}
                    alt={card.title}
                  />
                  {/* Card Content */}
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 2 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>

            {/* 每个卡片后都有一个带有点击特效的 Item */}
            <CardActionArea sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: '100px' }}>
              <Item>購買</Item>
            </CardActionArea>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
