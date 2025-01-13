// src/components/Comments.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Comments = () => {
  const comments = [
    { id: 1, content: "這是我的第一條評論！" },
    { id: 2, content: "這是我的第二條評論！" },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        我的評論
      </Typography>
      {comments.map((comment) => (
        <Box key={comment.id} sx={{ marginBottom: 2 }}>
          <Typography variant="body1">{comment.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Comments;
