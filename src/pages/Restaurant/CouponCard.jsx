import React from "react";
import { Button, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CouponCard = ({ coupon, restaurantId }) => {
console.log("CouponCard 接收到的 coupon:", coupon);
console.log("CouponCard 接收到的 restaurantId:", restaurantId);

  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(`/paymentPage?storeId=${coupon.storeId}&couponId=${coupon.id}&price=${coupon.price}&name=${coupon.name}`);
  };

  return (
    <Card sx={styles.card}>
      <div style={styles.cardContent}>
        <CardMedia
          component="img"
          alt={coupon.name}
          height="140"
          image={coupon.image}
          sx={styles.image}
        />
        <div style={styles.textContainer}>
          <Typography variant="h6">{coupon.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            ${coupon.price}
          </Typography>
          <Button variant="contained" onClick={handlePurchase} sx={styles.button}>
            購買
          </Button>
        </div>
      </div>
    </Card>
  );
};

const styles = {
  card: {
    width: "300px", // 每個餐券卡片寬度
    margin: "10px",
    display: "inline-block", // 改為 inline-block，讓餐券水平排列
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)", // 鼠標懸停時放大效果
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  cardContent: {
    display: "flex",
    alignItems: "center", // 垂直居中對齊
  },
  image: {
    width: "100px", // 照片的寬度
    height: "100px", // 照片的高度
    objectFit: "cover", // 保持圖片比例，並裁剪多餘部分
    marginRight: "15px", // 文字和按鈕與圖片之間的間距
  },
  textContainer: {
    display: "flex",
    flexDirection: "flex", // 文字部分上下排列
    justifyContent: "space-between", // 在垂直方向上有間距
    height: "100%", // 讓文字和按鈕占滿剩餘空間
  },
  button: {
    marginTop: "10px", // 按鈕和價格之間的間距
    backgroundColor: "#00796b", // 按鈕顏色
    "&:hover": {
      backgroundColor: "#004d40",
    },
  },
};

export default CouponCard;
