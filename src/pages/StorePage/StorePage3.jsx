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
  useEffect(() => {
    fetch(`http://localhost:8080/coupons/selectCoupon?storeId=4`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("no response");
        }
        return res.json();
      })
      .then((data) => {
        const limitedCards = data.slice(0, 3);
        setCards(limitedCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            >
              <Item>購買</Item>
            </CardActionArea>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
