import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Home() {
  const [browsingHistory, setBrowsingHistory] = useState([]);

  // Fetch browsing history
  useEffect(() => {
    const fetchBrowsingHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/History/list", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("後端返回的數據:", data);
          setBrowsingHistory(data); // 更新狀態
        } else {
          console.error("獲取瀏覽紀錄失敗:", response.status);
        }
      } catch (error) {
        console.error("獲取瀏覽紀錄失敗:", error);
      }
    };

    fetchBrowsingHistory();
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '10vh',
          paddingTop: '20px',
          marginTop: '50px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          您瀏覽過的餐廳
        </h1>
      </div>
      <ImageList
        style={{ maxWidth: '90%', height: '80%' }}
        sx={{
          overflow: 'hidden',
          flexWrap: 'wrap',
          gap: 5,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        cols={3}
        gap={10}
      >
        {browsingHistory.length > 0 ? (
          browsingHistory.map((item) => (
            <ImageListItem
              key={`${item.historyId}-${item.restaurant.restaurantId}`} // 確保唯一性
              sx={{ border: 'none' }}
              style={{ maxWidth: '250px', height: 'auto' }}
            >
              <img
                src={item.restaurant.image || 'https://via.placeholder.com/250x100'} // 預設圖片
                alt={item.restaurant.name}
                loading="lazy"
                style={{
                  display: 'block',
                  width: '250px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5%',
                }}
              />
              <ImageListItemBar
                title={item.restaurant.name}
                subtitle={<span>{item.restaurant.description}</span>}
                position="below"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 0',
                }}
              />
            </ImageListItem>
          ))
        ) : (
          <p>目前無瀏覽紀錄</p>
        )}
      </ImageList>
    </>
  );
}
