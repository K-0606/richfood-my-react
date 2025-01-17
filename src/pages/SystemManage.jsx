import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Checkbox, FormControlLabel, Button, Box, Tab, Tabs, Pagination, Paper, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';

const COMMENTS_PER_PAGE = 5;

const filteredComments = [
  { id: 1, text: '這是系統過濾有疑慮的評論 1', user: 'User1' },
  { id: 2, text: '這是系統過濾有疑慮的評論 2', user: 'User2' },
  { id: 3, text: '這是系統過濾有疑慮的評論 3', user: 'User3' },
  { id: 4, text: '這是系統過濾有疑慮的評論 4', user: 'User4' },
  { id: 5, text: '這是系統過濾有疑慮的評論 5', user: 'User5' },
];

const SystemManage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedComments, setSelectedComments] = useState([]);
  const [actionType, setActionType] = useState('');
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (activeTab === 1) {
      const fetchComments = async () => {
        try {
          const response = await fetch('http://localhost:8080/reviews/flagged');
          if (!response.ok) {
            throw new Error('Failed to fetch comments');
          }
          const data = await response.json();
          setComments(data);
        } catch (error) {
          console.error(error.message);
          alert('無法加載評論數據，請檢查後端服務。');
        }
      };

      fetchComments();
    }
  }, [activeTab]);

  const currentComments = activeTab === 0 ? filteredComments : comments;

  const displayedComments = currentComments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
    setSelectedComments([]);
  };

  const handleCommentSelection = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleAction = async () => {
    if (selectedComments.length === 0) {
      alert('請選擇至少一個評論以進行操作。');
      return;
    }

    try {
      for (const commentId of selectedComments) {
        const payload = {
          adminId: 1, // 假設管理者 ID
          action: actionType,
          reason: actionType === 'publish' ? '透過店家要求' : '會員檢舉原因',
          isFinal: true,
          reviewId: commentId,
        };

        const response = await fetch('http://localhost:8080/review-audits/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`操作失敗：評論 ID ${commentId}`);
        }
      }

      alert('操作已成功提交！');
      setSelectedComments([]);
      setActionType('');

      if (activeTab === 1) {
        const refreshResponse = await fetch('http://localhost:8080/reviews/flagged');
        const refreshedData = await refreshResponse.json();
        setComments(refreshedData);
      }
    } catch (error) {
      console.error(error);
      alert('操作失敗：' + error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          系統管理者後台
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="系統過濾有疑慮的評論" />
          <Tab label="會員檢舉有疑慮的評論" />
        </Tabs>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {activeTab === 0 ? '系統過濾有疑慮的評論' : '會員檢舉有疑慮的評論'}
          </Typography>
          <Grid container spacing={2}>
            {displayedComments.map((comment) => (
              <Grid item xs={12} key={comment.id || comment.reviewId}>
                <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                      {activeTab === 0 ? `用戶名稱: ${comment.user}` : `餐廳名稱: ${comment.restaurantName}`}
                    </Typography>
                    <Typography>
                      {activeTab === 0 ? `評論內容: ${comment.text}` : `會員名稱: ${comment.userName}`}
                    </Typography>
                    {activeTab === 1 && <Typography>評論內容: {comment.content}</Typography>}
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedComments.includes(comment.id || comment.reviewId)}
                        onChange={() => handleCommentSelection(comment.id || comment.reviewId)}
                      />
                    }
                    label="選擇"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              操作選項
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">選擇操作</FormLabel>
              <RadioGroup
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                row
              >
                <FormControlLabel
                  value="publish"
                  control={<Radio />}
                  label="允許發佈"
                />
                <FormControlLabel
                  value="delete"
                  control={<Radio />}
                  label="刪除"
                />
                <FormControlLabel
                  value="block"
                  control={<Radio />}
                  label="刪除評論並封鎖使用者"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(currentComments.length / COMMENTS_PER_PAGE)}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleAction}>
              提交處理
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SystemManage;
import React, { useState } from 'react';
import { Container, Grid, Typography, Checkbox, FormControlLabel, Button, Box, Tab, Tabs, Pagination, Paper, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';

const COMMENTS_PER_PAGE = 5;

const filteredComments = [
  { id: 1, text: '這是系統過濾有疑慮的評論 1', user: 'User1' },
  { id: 2, text: '這是系統過濾有疑慮的評論 2', user: 'User2' },
  { id: 3, text: '這是系統過濾有疑慮的評論 3', user: 'User3' },
  { id: 4, text: '這是系統過濾有疑慮的評論 4', user: 'User4' },
  { id: 5, text: '這是系統過濾有疑慮的評論 5', user: 'User5' },
];

const reportedComments = [
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
  const [actionType, setActionType] = useState(''); // 保存选择的操作类型
  const [page, setPage] = useState(1);

  // 根據當前 Tab 顯示不同的評論數據
  const currentComments =
    activeTab === 0 ? filteredComments : reportedComments;

  // 獲取當前頁面顯示的評論
  const displayedComments = currentComments.slice(
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
    console.log('選擇的操作類型:', actionType);

    // 根據操作類型進行處理
    if (actionType === 'delete') {
      // 刪除選中的評論
      const updatedComments = currentComments.filter(
        (comment) => !selectedComments.includes(comment.id)
      );

      if (activeTab === 0) {
        // 如果是系統過濾 Tab，更新 filteredComments
        filteredComments = updatedComments;
      } else {
        // 如果是會員檢舉 Tab，更新 reportedComments
        reportedComments = updatedComments;
      }
    }

    // 操作完成後重設選中的評論
    setSelectedComments([]);
    alert('操作已提交');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          系統管理者後台
        </Typography>

        {/* Tab 切換 */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="系統過濾有疑慮的評論" />
          <Tab label="會員檢舉有疑慮的評論" />
        </Tabs>

        {/* 顯示選擇的 Tab 內容 */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {activeTab === 0
              ? '系統過濾有疑慮的評論'
              : '會員檢舉有疑慮的評論'}
          </Typography>
          <Grid container spacing={2}>
            {displayedComments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{comment.text}</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => handleCommentSelection(comment.id)}
                      />
                    }
                    label="選擇"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* 操作選項 */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              操作選項
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">選擇操作</FormLabel>
              <RadioGroup
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                row
              >
                <FormControlLabel
                  value="publish"
                  control={<Radio />}
                  label="允許發佈"
                />
                <FormControlLabel
                  value="delete"
                  control={<Radio />}
                  label="刪除"
                />
                <FormControlLabel
                  value="block"
                  control={<Radio />}
                  label="刪除評論並封鎖使用者"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* 分頁控制 */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(currentComments.length / COMMENTS_PER_PAGE)}
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
};

export default SystemManage;
