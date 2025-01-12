import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setSnackbarMessage("請填寫所有欄位！");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      // 假設你有一個後端 API 用於發送郵件
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSnackbarMessage("感謝您的留言，我們會盡快聯絡您！");
        setSnackbarSeverity("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSnackbarMessage("發送失敗，請稍後再試。");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("發生錯誤，請稍後再試。");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: "3rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        聯絡我們
      </Typography>

      <Grid container spacing={3}>
        {/* 聯絡表單區域 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "2rem" }}>
            <Typography variant="h6" gutterBottom>
              有任何問題？隨時告訴我們！
            </Typography>
            <Divider sx={{ marginBottom: "1rem" }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="姓名"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="電子郵件"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="留言內容"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" color="primary" type="submit">
                    發送留言
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        {/* 聯絡資訊區域 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "2rem" }}>
            <Typography variant="h6" gutterBottom>
              聯絡資訊
            </Typography>
            <Divider sx={{ marginBottom: "1rem" }} />
            <Box sx={{ marginBottom: "1.5rem" }}>
              <PhoneIcon sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              <Typography variant="body1" component="span">
                電話：123-456-7890
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1.5rem" }}>
              <EmailIcon sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              <Typography variant="body1" component="span">
                電子郵件：contact@ifoodie.tw
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "1.5rem" }}>
              <LocationOnIcon sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              <Typography variant="body1" component="span">
                地址：台北市某某路123號
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar 提示訊息 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUsPage;
