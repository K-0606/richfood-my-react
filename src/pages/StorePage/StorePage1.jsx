import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Carousel } from 'react-responsive-carousel'; 
import Typography from '@mui/material/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useLocation, useNavigate } from 'react-router-dom';
import MapComponent from '../../components/common/MapComponent';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';

// import { useNavigate } from 'react-router-dom';





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
  const { state } = useLocation();
  const navigate = useNavigate();
  const [Restaurant, setRestaurant] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(2);  // 初始评分为2颗星
  const [comment, setComment] = useState('');
  const restaurantId = state.restaurant.restaurantId;

  // 模擬已登入和未登入的情況，這邊可以切換
  // const isLoggedIn = localStorage.getItem('authToken') ? true : false; // 用來檢查登入狀態
  const isLoggedIn = true; // 模擬已登入狀態 (請將此行設為 `false` 測試未登入狀態)

  // 假設我們從 localStorage 或 Redux 等地方來獲取是否登入的狀態
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 假設這裡使用 localStorage 來檢查登入狀態

  const handleBookRedirect = () => {
    navigate('book');
  };

  const fetchData = async (restaurantId) => {
    const url = `http://localhost:8080/restaurants/${restaurantId}`;
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setRestaurant(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(restaurantId);
  }, [restaurantId]);

  const handleOpenDialog = () => {
    if (isLoggedIn) {
      setOpenDialog(true);
    } else {
      alert("請先登入！");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(2);  // 重設評分
    setComment(''); // 重設評論
  };

  const handleSubmitReview = () => {
    // 此處可根據需要發送 API 請求來提交評論和評分
    console.log("提交的評論:", comment);
    console.log("提交的評分:", rating);
    alert("評論已提交！");
    handleCloseDialog();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', marginTop: '-50px' }}>
      
      {/* 轮播图部分 */}
      <Box sx={{ width: '500px', height: '500px', marginRight: 5 }}>
        <ImageCarousel Restaurant={Restaurant}/>
      </Box>

      {/* Stack 部分 */}
      <Stack spacing={2} sx={{ width: '300px', position: 'relative', top: '-55px' }}>
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>{Restaurant.name}</Typography>
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>平均消費：{Restaurant.average}</Typography>
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>地址：{Restaurant.country}{Restaurant.district}{Restaurant.address}</Typography>
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>電話：{Restaurant.phone}</Typography>
        <Typography variant="h2" sx={{ fontSize: '1rem' }}>營業時間：</Typography>
        <Item onClick={handleBookRedirect}>預約</Item>
        <Item onClick={handleOpenDialog}>評論</Item> {/* 點擊評論彈出框 */}
        <MapComponent adressStorePage={`${Restaurant.country}${Restaurant.district}${Restaurant.address}`} />
      </Stack>

      {/* 評論彈窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>留下您的評論</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            max={5}
          />
          <TextField
            label="您的評論"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmitReview}>提交</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}