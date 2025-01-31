import React, { createContext,useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { styled } from "@mui/material/styles";
import { Carousel } from "react-responsive-carousel";
import Typography from "@mui/material/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import MapComponent from "../../components/common/MapComponent";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Star from "@mui/icons-material/Star";
import ReviewSection from "./ReviewSection"; // 引入評論區組件

// import { useNavigate } from 'react-router-dom';

// 使用 MUI 的 Paper 和 styled 创建样式化的 Item
const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px", // 圆角效果
  transition: "all 0.3s ease", // 添加平滑过渡效果
  cursor: "pointer", // 鼠标指针样式
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // 鼠标悬浮时改变背景色
    transform: "scale(1.1)", // 鼠标悬浮时放大
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // 添加阴影效果
  },
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "65px", // 设置 Item 高度
  width: "65px", // 设置 Item 宽度
  display: "flex", // 保证 Item 内容居中
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer", // 给 Item 添加手形光标，表示可以点击
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // 使 Item 在悬浮时显示效果
  },
}));

// 轮播图组件
const ImageCarousel = ({ Restaurant }) => (
  <Carousel infiniteLoop showStatus={false} swipeable={true}>
    <div>
      <img
        src={Restaurant.image}
        alt="Image 1"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
        alt="Image 2"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
        alt="Image 3"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
        alt="Image 4"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
        alt="Image 5"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  </Carousel>
);

export default function BStorePage1() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [Restaurant, setRestaurant] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(2); // 初始评分为2颗星
  const [comment, setComment] = useState("");
  const [cards, setCards] = useState([]);
  const restaurantId = state.restaurant.restaurantId;
  const [storeId, setStoreId] = useState("");
  const [refreshReviews, setRefreshReviews] = useState(false); // 刷新評論標記

  // const { restaurantId } = state  || {}; // 確保 itemData1 正確接收到
  console.log("接收到的 state:", restaurantId);
  console.log("接收到的 state:", state.restaurant.restaurantId);

  // 模擬已登入和未登入的情況，這邊可以切換
  // const isLoggedIn = localStorage.getItem('authToken') ? true : false; // 用來檢查登入狀態
  const isLoggedIn = true; // 模擬已登入狀態 (請將此行設為 `false` 測試未登入狀態)

  // 假設我們從 localStorage 或 Redux 等地方來獲取是否登入的狀態
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 假設這裡使用 localStorage 來檢查登入狀態

  const handleBookRedirect = () => {
    navigate("book",{state:{storeId}});
  };

  const fetchData = async (restaurantId) => {
    const url = `http://localhost:8080/restaurants/${restaurantId}`;

    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setRestaurant(data);
      setStoreId(data.storeId);
      window.storeId = data.storeId; 
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
    setRating(2); // 重設評分
    setComment(""); // 重設評論
  };

  
 
  const handleSubmitReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Reviews/restaurant/${restaurantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 攜帶 Cookie
          body: JSON.stringify({
            rating,
            content: comment,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      alert("評論提交成功！");
      handleCloseDialog();
      setRefreshReviews((prev) => !prev); // 更新標記，讓 ReviewSection 重新加載評論
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("提交評論失敗！");
    }
  };


  return (
    <Box>
      {/* 店家介紹 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Box sx={{ width: "650px", marginRight: 5 }}>
          <ImageCarousel Restaurant={Restaurant} />
        </Box>
        <Stack spacing={2} sx={{ width: "300px" }}>
          <Typography variant="h1" sx={{ fontSize: "2.5rem" }}>
            {Restaurant.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <strong>評分:</strong> {Restaurant.rating || "暫無評分"}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                sx={{
                  color: i < Restaurant.rating ? "gold" : "gray",
                  fontSize: "20px",
                }}
              />
            ))}
          </Box>
          <Typography>地址：{Restaurant.country}{Restaurant.district}{Restaurant.address}</Typography>
          <Typography>電話：{Restaurant.phone}</Typography>
          <Item1 onClick={() => navigate("book", { state: { storeId: Restaurant.storeId } })}>
            預約
          </Item1>
          <Item1 onClick={handleOpenDialog}>評論</Item1>
        </Stack>
      </Box>

      {/* 地圖區域 */}
      <Box>
        <MapComponent
          adressStorePage={`${Restaurant.country}${Restaurant.district}${Restaurant.address}`}
        />
      </Box>

      {/* 評論區 */}
      <ReviewSection
        restaurantId={restaurantId}
        refreshTrigger={refreshReviews} // 傳遞標記
      />

      {/* 評論彈窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>留下您的評論</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
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