import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';



export default function StorePage() {
  // 只保留3个卡片
  const cards = [
    {
      title: 'Lizard 1',
      description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    },
    {
      title: 'Lizard 2',
      description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    },
    {
      title: 'Lizard 3',
      description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',  // 水平居中
      alignItems: 'center',      // 垂直居中
      width: '100%', 
      height: '100vh',  // 使容器占满整个视口高度
      marginTop: '-50px',  // 使整体布局有一些空隙
      gap: 3,
    }}>

      {/* 卡片部分 */}
      <Box sx={{ 
        width: '700px', 
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
              maxWidth: '700px', 
              height: '200px', 
              display: 'flex', 
              justifyContent: 'flex-start',
              boxShadow: 'none', // 取消阴影
              border: 'none',   // 取消边框
              backgroundColor: 'transparent', // 透明背景色
            }}>
              <CardActionArea>
                <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  width: '700px',
                  
                  }}>
                  {/* Card Image */}
                  <CardMedia
                    component="img"
                    sx={{ width: '300px', height: '200px' }}
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
          </Box>
        ))}
      </Box>
    </Box>
  );
}
