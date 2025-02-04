import React, { useState } from 'react';
import { Button, Grid, Box, Typography, Divider, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const menuItems = [
  { id: 1, name: 'AAAA', price: 300, imageUrl: 'https://fruitlovelife.com/wp-content/uploads/2024/09/IMG_5817.jpg' },
  //{ id: 2, name: 'BBBBBBB', price: 450, imageUrl: 'https://www.12hotpot.com.tw/images/demo/deco-menu.png' },
  // { id: 3, name: 'CCCCCCC', price: 500, imageUrl: 'https://www.sushiexpress.com.tw/images/Product/6458_s.png' },
  // { id: 4, name: 'DDDDD', price: 350, imageUrl: 'https://shoplineimg.com/5fbb6edf9e6af50038441874/611e183cc25280003ec74bea/800x.jpg?' },
  // { id: 5, name: 'EEEE', price: 600, imageUrl: 'https://as.chdev.tw/web/images/article_data/picture_path/img_75941_34108ffc-dd36-4904-a8f5-2d1eb0570774.jpg' },
];

function PaymentPage() {
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  // 處理增加數量
  const handleIncrement = (itemId, price) => {
    setSelectedItems(prevState => {
      const newState = { ...prevState };
      if (newState[itemId]) {
        if (newState[itemId] < 99) {
          newState[itemId] += 1;
          setTotalAmount(totalAmount + price);
        }
      } else {
        newState[itemId] = 1;
        setTotalAmount(totalAmount + price);
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
        setTotalAmount(totalAmount - price);
      } else if (newState[itemId] === 1) {
        // 當數量為 1 時，移除該餐點並減去金額
        const newAmount = totalAmount - price;
        const { [itemId]: _, ...rest } = newState; // 移除該項目
        setTotalAmount(newAmount);
        return rest;
      }
      return newState;
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">餐券購買</Typography>

      {/* 顯示餐點選擇清單 */}
      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} key={item.id} container spacing={2} alignItems="center">
            <Grid item xs={12} sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              border: selectedItems[item.id] > 0 ? '2px solid #4caf50' : '1px solid #ccc', // 選中時邊框變綠色
              backgroundColor: selectedItems[item.id] > 0 ? '#e8f5e9' : 'transparent', // 選中時背景顏色變淡綠
              borderRadius: '4px',
              transition: 'all 0.3s ease', // 加入過渡效果
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: selectedItems[item.id] > 0 ? '#d0f0c0' : '#f1f1f1', // Hover時變顏色
              }
            }}>
              {/* 餐點圖片 */}
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                style={{
                  width: 'auto',  // 自動寬度
                  height: 50, // 高度設定固定
                  maxWidth: 50, // 最大寬度為 50
                  objectFit: 'contain', // 保持原始比例
                  marginRight: 16, // 讓圖片與文字之間有點間距
                }} 
              />
              
              {/* 餐點名稱 */}
              <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: 2 }}>
                {item.name} - {item.price}元
              </Typography>

              {/* 增減數量的按鈕 */}
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => handleDecrement(item.id, item.price)}
                  disabled={selectedItems[item.id] <= 0}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={selectedItems[item.id] || 0}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: 40, textAlign: 'center' }}
                />
                <IconButton
                  onClick={() => handleIncrement(item.id, item.price)}
                  disabled={selectedItems[item.id] >= 99}
                >
                  <Add />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ margin: '20px 0' }} />

      {/* 顯示總金額 */}
      <Typography variant="h6" align="center">
        總金額: {totalAmount} 元
      </Typography>

      {/* 前往付款按鈕 */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={totalAmount === 0} // 如果沒有選擇任何餐點，禁用付款按鈕
          onClick={() => {
            // 假設跳轉到付款頁面，這邊你可以替換為實際的付款頁面連結
            window.location.href = '/linepay'; // 這只是示範，實際後端會處理付款邏輯
          }}
        >
          前往付款
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentPage;
