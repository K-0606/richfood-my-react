import * as React from 'react';
import { useState, useEffect } from 'react';
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
  const [reviews, setReviews] = useState([]);

  // 從後端獲取最新評論
  useEffect(() => {
    fetch('http://localhost:8080/Reviews/latest') // 確保 API URL 正確
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setReviews(data))
      .catch(error => console.error("Error fetching latest reviews:", error));
  }, []);


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Slider {...settings}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={index} sx={{ padding: '20px', gap: 2 }}>
                <Card
                  style={{ maxWidth: '95%' }}
                  sx={{ width: '300px', height: '170px', display: 'flex', gap: 2, margin: '0 auto' }}
                >
                  <CardActionArea>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '300px' }}>
                      {/* 這裡暫時沒有圖片，因此我們顯示一個固定的圖片 */}
                      <CardMedia
                        component="img"
                        sx={{ width: '70px', height: '70px', objectFit: 'cover', margin: '0 auto', borderRadius: '10px' }}
                        image={review.imageUrl ? review.imageUrl : "/default-placeholder.png"}
                        alt={review.restaurantName}
                      />

                      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 2 }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {review.restaurantName} - {review.rating}⭐
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {review.content}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'gray' }}>
                          {new Date(review.createdAt).toLocaleDateString()} {new Date(review.createdAt).toLocaleTimeString()}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            ))
          ) : (
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', padding: '20px' }}>
              正在加載評論...
            </Typography>
          )}
        </Slider>
      </Box>
    </React.Fragment>
  );
}
