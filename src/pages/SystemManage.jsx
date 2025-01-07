import React, { useState } from 'react';
import { Container, Grid, Typography, Checkbox, FormControlLabel, Button, Box, Tab, Tabs, Pagination, Paper } from '@mui/material';

const COMMENTS_PER_PAGE = 5;

const mockComments = [
    { id: 1, text: '這是系統過濾有疑慮的評論 1', user: 'User1' },
    { id: 2, text: '這是系統過濾有疑慮的評論 2', user: 'User2' },
    { id: 3, text: '這是系統過濾有疑慮的評論 3', user: 'User3' },
    { id: 4, text: '這是系統過濾有疑慮的評論 4', user: 'User4' },
    { id: 5, text: '這是系統過濾有疑慮的評論 5', user: 'User5' },
    { id: 6, text: '這是會員檢舉有疑慮的評論 6', user: 'User6' },
    { id: 7, text: '這是會員檢舉有疑慮的評論 7', user: 'User7' },
    { id: 8, text: '這是會員檢舉有疑慮的評論 8', user: 'User8' },
    { id: 9, text: '這是會員檢舉有疑慮的評論 9', user: 'User9' },
    { id: 10, text: '這是會員檢舉有疑慮的評論 10', user: 'User10' },
    { id: 11, text: '這是會員檢舉有疑慮的評論 11', user: 'User11' },
    { id: 12, text: '這是會員檢舉有疑慮的評論 12', user: 'User12' },
  ];
  

const SystemManage = () => {
    const [activeTab, setActiveTab] = useState(0);
  const [selectedComments, setSelectedComments] = useState([]);
  const [allowPublish, setAllowPublish] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [blockUser, setBlockUser] = useState(false);
  const [page, setPage] = useState(1);

  // 獲取當前頁面顯示的評論
  const currentComments = mockComments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1); // 每次切換 Tab 時重置頁碼
  };

  const handleCommentSelection = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleAction = () => {
    console.log('選中的評論 ID:', selectedComments);
    console.log('允許發佈:', allowPublish);
    console.log('刪除:', deleteComment);
    console.log('封鎖使用者:', blockUser);
    alert('操作已提交');
    // 在這裡可以發送 API 請求處理操作
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          系統管理者後台
        </Typography>

        {/* Tab 切換 */}
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="系統過濾有疑慮的評論" />
          <Tab label="會員檢舉有疑慮的評論" />
        </Tabs>

        {/* 顯示選擇的 Tab 內容 */}
        <Box sx={{ mt: 4 }}>
          {activeTab === 0 && (
            <>
              <Typography variant="h5" gutterBottom>
                系統過濾有疑慮的評論
              </Typography>
              <Grid container spacing={2}>
                {currentComments.map((comment) => (
                  <Grid item xs={12} key={comment.id}>
                    <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{comment.text}</Typography>
                      <FormControlLabel
                        control={<Checkbox checked={selectedComments.includes(comment.id)} onChange={() => handleCommentSelection(comment.id)} />}
                        label="選擇"
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {activeTab === 1 && (
            <>
              <Typography variant="h5" gutterBottom>
                會員檢舉有疑慮的評論
              </Typography>
              <Grid container spacing={2}>
                {currentComments.map((comment) => (
                  <Grid item xs={12} key={comment.id}>
                    <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{comment.text}</Typography>
                      <FormControlLabel
                        control={<Checkbox checked={selectedComments.includes(comment.id)} onChange={() => handleCommentSelection(comment.id)} />}
                        label="選擇"
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* 操作選項 */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              操作選項
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox checked={allowPublish} onChange={() => setAllowPublish(!allowPublish)} />}
                  label="允許發佈"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox checked={deleteComment} onChange={() => setDeleteComment(!deleteComment)} />}
                  label="刪除"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox checked={blockUser} onChange={() => setBlockUser(!blockUser)} />}
                  label="刪除評論並封鎖使用者"
                />
              </Grid>
            </Grid>
          </Box>

          {/* 分頁控制 */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(mockComments.length / COMMENTS_PER_PAGE)}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>

          {/* 提交操作 */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleAction}>
              提交處理
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

  
export default SystemManage;