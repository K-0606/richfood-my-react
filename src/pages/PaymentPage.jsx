import React, { useState } from 'react';
import { Button, Grid, Box, Typography, Divider, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

const defaultMenuItems = [
  { id: 1, name: 'AAAA', price: 100, imageUrl: 'https://fruitlovelife.com/wp-content/uploads/2024/09/IMG_5817.jpg' },
  //{ id: 2, name: 'BBBBBBB', price: 450, imageUrl: 'https://www.12hotpot.com.tw/images/demo/deco-menu.png' },
  // { id: 3, name: 'CCCCCCC', price: 500, imageUrl: 'https://www.sushiexpress.com.tw/images/Product/6458_s.png' },
  // { id: 4, name: 'DDDDD', price: 350, imageUrl: 'https://shoplineimg.com/5fbb6edf9e6af50038441874/611e183cc25280003ec74bea/800x.jpg?' },
  // { id: 5, name: 'EEEE', price: 600, imageUrl: 'https://as.chdev.tw/web/images/article_data/picture_path/img_75941_34108ffc-dd36-4904-a8f5-2d1eb0570774.jpg' },
];

function PaymentPage() {
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('storeId');
  const couponId = searchParams.get('couponId');
  const price = searchParams.get('price');
  const name = searchParams.get('name');
  
  const menuItems = couponId && name ? [
    { id: parseInt(couponId), name, price: parseInt(price), imageUrl: 'https://fruitlovelife.com/wp-content/uploads/2024/09/IMG_5817.jpg' },
  ] : defaultMenuItems;

  // 處理增加數量
  const handleIncrement = (itemId, price) => {
    setSelectedItems(prevState => {
      const newState = { ...prevState };
      if (newState[itemId]) {
        if (newState[itemId] < 99) {
          newState[itemId] += 1;
          setTotalAmount(prevTotal => prevTotal + price);
        }
      } else {
        newState[itemId] = 1;
        setTotalAmount(prevTotal => prevTotal + price);
      }
      return newState;
    });
  };

  // 處理減少數量
  const handleDecrement = (itemId, price) => {
    setSelectedItems(prevState => {
      const newState = { ...prevState };
      if (newState[itemId] > 1) {
        newState[itemId] -= 1;
        setTotalAmount(prevTotal => prevTotal - price);
      } else if (newState[itemId] === 1) {
        const newAmount = totalAmount - price;
        const { [itemId]: _, ...rest } = newState; 
        setTotalAmount(newAmount);
        return rest;
      }
      return newState;
    });
  };

  // 處理付款
  const handlePayment = async () => {  
    const totalQuantity = Object.values(selectedItems).reduce((sum, quantity) => sum + quantity, 0);
    try {
      const orderItems = {
        storeId: storeId,
        couponId: couponId,
        price: price,
        quantity: totalQuantity 
      };

      console.log(orderItems);
      const response = await fetch("http://localhost:8080/couponsOrder/addCouponsOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderItems),
      });
      const redirectUrl = await response.text(); // 取得後端回傳的 URL（純文字）
      window.location.href = redirectUrl; // 跳轉到該 URL
    } catch (error) {
      console.error("發生錯誤:", error);
      alert("請求失敗，請稍後再試");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">餐券購買</Typography>

      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} key={item.id} container spacing={2} alignItems="center">
            <Grid item xs={12} sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              border: selectedItems[item.id] > 0 ? '2px solid #4caf50' : '1px solid #ccc',
              backgroundColor: selectedItems[item.id] > 0 ? '#e8f5e9' : 'transparent',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: selectedItems[item.id] > 0 ? '#d0f0c0' : '#f1f1f1',
              }
            }}>
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                style={{
                  width: 'auto',
                  height: 50,
                  maxWidth: 50,
                  objectFit: 'contain',
                  marginRight: 16,
                }} 
              />
              <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: 2 }}>
                {item.name} - {item.price}元
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => handleDecrement(item.id, item.price)} disabled={selectedItems[item.id] <= 0}>
                  <Remove />
                </IconButton>
                <TextField
                  value={selectedItems[item.id] || 0}
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{ width: 40, textAlign: 'center' }}
                />
                <IconButton onClick={() => handleIncrement(item.id, item.price)} disabled={selectedItems[item.id] >= 99}>
                  <Add />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ margin: '20px 0' }} />
      <Typography variant="h6" align="center">總金額: {totalAmount} 元</Typography>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" fullWidth disabled={totalAmount === 0} onClick={handlePayment}>
          前往付款
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentPage;
