import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CssBaseline from '@mui/material/CssBaseline';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 



export default function BoxSx() {
  const cards = Array(10).fill(null).map((_, index) => ({
    title: `卡片 ${index + 1}`,
    description: `123。`,
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', // 示例图片
  }));

  const settings = {
    // dots: true,               // 显示分页点
    overflow: 'hidden',
    infinite: true,           // 无限轮播
    speed: 500,               // 切换速度
    slidesToShow: 3,          // 每次展示3张卡片
    slidesToScroll: 1,        // 每次滑动1张卡片
    focusOnSelect: true,
    justifyContent: 'center',
    alignItems: 'center',
    responsive: [
      {
        breakpoint: 1024,     // 在1024px以下屏幕显示1张卡片
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <CssBaseline />
        <Box 
          sx={{
            width: '100%',
            backgroundColor: 'gray',
            bottom: 0,          // 距离底部0
            zIndex: 10,         // 确保footer位于最上
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Slider {...settings}>
            {/* 渲染卡片，每3张卡片为一页 */}
            {cards.map((card, index) => (
              <Box key={index} 
              sx={{ 
                padding: '20px',
                gap: 2,
              }}>
                {/* Card */}
                <Card 
                style={{ maxWidth: '95%', }}
                sx={{ 
                  width: '300px', 
                  height: '150px', 
                  display: 'flex', 
                  gap: 2,
                  margin: '0 auto', // 使卡片居中显示
                }}>
                  <CardActionArea>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        width: '300px' ,
                        
                        }}>
                      {/* Card Image */}
                      <CardMedia
                        component="img"
                        sx={{ 
                          width: '70px', 
                          height: '70px' ,
                          objectFit: 'cover',  // 保持图片比例，裁剪多余部分
                          margin: '0 auto',    // 使图片水平居中
                        }}
                        image={card.image}
                        alt={card.title}
                      />
                      {/* Card Content */}
                      <CardContent 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        paddingLeft: 2, 
                        }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {card.title}
                        </Typography>
                        <Typography variant="body2" 
                        sx={{ color: 'text.secondary' }}>
                          {card.description}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
    </React.Fragment>
  );
}
