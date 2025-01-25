import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Collections = ({ collections }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的珍藏
      </Typography>
      <Grid container spacing={3}>
        {collections && collections.length > 0 ? (
          collections.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.restaurantId}>
              <Card>
                {/* 餐廳圖片 */}
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="200"
                  image={item.image || '/default-image.jpg'} // 如果沒有圖片，顯示默認圖片
                />
                <CardContent>
                  {/* 餐廳名稱，點擊後跳轉 */}
                  <Link to={`/store/${item.restaurantId}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                  </Link>

                  {/* 營業時間 */}
                  <Typography variant="body2" color="text.secondary">
                    <strong>營業時間：</strong>
                  </Typography>
                  <div>
                    {item.businessHours.map((hours, index) => (
                      <div key={index}>
                        {hours.dayOfWeek}: {hours.startTime} - {hours.endTime}
                      </div>
                    ))}
                  </div>

                  {/* 地址 */}
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    <strong>地址：</strong> {item.address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography></Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Collections;
