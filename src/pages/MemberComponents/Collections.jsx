// src/components/Collections.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Collections = () => {
  const collections = [
    { id: 1, name: "珍藏餐點 A" },
    { id: 2, name: "珍藏餐點 B" },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的珍藏
      </Typography>
      {collections.map((item) => (
        <Box key={item.id} sx={{ marginBottom: 2 }}>
          <Typography variant="body1">{item.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Collections;
