import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

// 创建一个样式化的 Item
const Item = styled(Paper)(({ theme }) => ({
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

export default function StorePage() {
  const [cards, setCards] = useState([]);
  const storeId = window.storeId;

  useEffect(() => {

    const fetchCoupons = async () => {
      try {
        const storeId = window.storeId; // 從全局變數中讀取 storeId

        if (storeId) {
          const response = await fetch(`http://localhost:8080/coupons/selectCoupon?storeId=${storeId}`);
          if (!response.ok) throw new Error('網路錯誤');
          
          const data = await response.json();
          setCards(data.slice(0, 3)); // 限制顯示 3 個卡片
        }
      } catch (error) {
        console.error('抓取錯誤: ', error);
      }
    };
    fetchCoupons();
    
  }, [storeId]);

  const handlePurchase = async (couponId, price) => {
    const quantity = 1; // 固定1
    console.log('送出數據', {
      couponId,
      quantity,
      price,
      storeId
    });
    try {
      const response = await fetch("http://localhost:8080/couponsOrder/addCouponsOrder", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          couponId,
          quantity,
          price,
          storeId,
        }),
      });

      if (!response.ok) throw new Error("下單失敗");
      const paymentUrl = await response.text(); 
      
      
      if (response) {
        window.location.href = paymentUrl;
      } else {
        console.error("未收到付款網址");
      }
    } catch (error) {
      console.error("購買失敗: ", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        marginTop: "-280px",
        gap: 3,
      }}
    >
      {/* 卡片部分 */}
      <Box
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 3.5,
          padding: "20px",
          marginRight: "-600px",
          marginTop: "-800px",
        }}
      >
        {/* 渲染3个卡片 */}
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
            cols={3}
          >
            {/* Card */}
            <Card
              sx={{
                maxWidth: "300px",
                height: "100px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <CardActionArea>
                <Box
                  sx={{ display: "flex", flexDirection: "row", width: "300px" }}
                >
                  {/* Card Image */}
                  <CardMedia
                    component="img"
                    sx={{ width: "100px", height: "100px" }}
                    image={card.image}
                    alt={card.title}
                  />
                  {/* Card Content */}
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingLeft: 2,
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>

            {/* 每个卡片后都有一个带有点击特效的 Item */}
            <CardActionArea
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "100px",
              }}
              onClick={() => handlePurchase(card.couponId, card.price)}
            >
              <Item>購買</Item>
            </CardActionArea>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
