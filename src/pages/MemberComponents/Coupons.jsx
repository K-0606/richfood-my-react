// src/components/Coupons.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Coupons = () => {
  const coupons = [
    { id: 1, code: "COUPON123", value: "100元優惠券" },
    { id: 2, code: "COUPON456", value: "50元優惠券" },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的餐券
      </Typography>
      {coupons.map((coupon) => (
        <Box key={coupon.id} sx={{ marginBottom: 2 }}>
          <Typography variant="body1">
            {coupon.value} - 代碼: {coupon.code}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Coupons;
