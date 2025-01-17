// src/components/Reservations.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Reservations = () => {
  const reservations = [
    { id: 1, restaurant: "餐廳 A", date: "2025-01-15 18:00" },
    { id: 2, restaurant: "餐廳 B", date: "2025-02-20 19:30" },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的訂位
      </Typography>
      {reservations.map((reservation) => (
        <Box key={reservation.id} sx={{ marginBottom: 2 }}>
          <Typography variant="body1">
            {reservation.restaurant} - 預定時間: {reservation.date}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Reservations;
