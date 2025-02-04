import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { useUser } from "../../context/UserContext"; // 引入 useUser hook 來獲取登入狀態
import { ArrowDropDown } from "@mui/icons-material"; // 使用這個圖示作為顯示全部營業時間的按鈕

import { useParams } from "react-router-dom"; // 引入 useParams

const RestaurantInfo = React.memo(({ restaurant }) => {
  const { user } = useUser(); // 使用 useUser 來獲取當前的用戶資料
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(2); // 初始評分為2顆星
  const [comment, setComment] = useState("");
  const [isFavorited, setIsFavorited] = useState(false); // 控制愛心是否填滿
  const [showAllHours, setShowAllHours] = useState(false); // 控制是否顯示全部營業時間

  const { restaurantId } = useParams();

  // 獲取今天是星期幾
  const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const today = new Date();
  const currentDay = daysOfWeek[today.getDay()];

  // 篩選今天的營業時間
  const todayHours = restaurant.businessHours.filter(
    (entry) => entry.businessHoursId.dayOfWeek === currentDay
  );

  // 將營業時間轉換成你需要的格式
  const formatBusinessHours = (businessHours) => {
    return businessHours.map((entry) => {
      const day = entry.businessHoursId.dayOfWeek;
      const startTime = entry.businessHoursId.startTime;
      const endTime = entry.endTime;
      return { day, time: `${startTime}~${endTime}` };
    });
  };

  // 合併相同天的時段
  const mergeTimes = (hours) => {
    return hours.reduce((acc, { day, time }) => {
      if (acc[day]) {
        acc[day].push(time);
      } else {
        acc[day] = [time];
      }
      return acc;
    }, {});
  };

  const formattedBusinessHours = mergeTimes(formatBusinessHours(restaurant.businessHours));
  const todayFormattedHours = mergeTimes(formatBusinessHours(todayHours));

  const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "8px", // 圓角效果
    transition: "all 0.3s ease", // 添加平滑過渡效果
    cursor: "pointer", // 鼠標指針樣式
    marginTop: "10px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // 鼠標懸浮時改變背景色
      transform: "scale(1.03)", // 鼠標懸浮時放大
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // 添加陰影效果
    },
  }));
  const handleBookRedirect = () => {

    // 直接從 URL 中抓取最後的數字部分
  const path = window.location.pathname;  // 獲取當前 URL 路徑
  const restaurantId = path.split("/").pop();  // 分割並提取最後一部分
    navigate("/book", { state: { restaurantId: restaurantId } }); // 傳遞 restaurantId
  };

  const handleOpenDialog = () => {
    if (user) {
      setOpenDialog(true); // 如果已登入，打開評論彈窗
    } else {
      alert("請先登入！");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(2); // 重設評分
    setComment(""); // 重設評論
  };

  const handleSubmitReview = () => {
    // 可在此處發送 API 請求來提交評論
    console.log("提交的評論:", comment);
    console.log("提交的評分:", rating);
    alert("評論已提交！");
    handleCloseDialog();
  };

  const handleFavorite = () => {
    if (user) {
      setIsFavorited(!isFavorited); // 切換愛心的狀態
      // 在此處可以加入 API 請求來將餐廳添加/移除到會員的收藏
      console.log(isFavorited ? "取消收藏" : "收藏餐廳");
    } else {
      alert("請先登入！");
    }
  };

  return (
    <div style={styles.infoContainer}>
      <h1 style={styles.restaurantName}>
        {restaurant.name}
        <button
          onClick={handleFavorite}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
            fontSize: "1.5rem",
            color: isFavorited ? "red" : "#ccc",
            transition: "color 0.3s ease",
          }}
        >
          {isFavorited ? "❤️" : "🤍"} {/* 愛心按鈕 */}
        </button>
      </h1>
      <div style={styles.detailsContainer}>
        <div style={styles.detailItem}>
          <strong>類型: </strong>
          <span>
            {restaurant.categories.map((category, index) => (
              <React.Fragment key={index}>
                {category.name}
                {index < restaurant.categories.length - 1 && ", "}
              </React.Fragment>
            ))}
          </span>
        </div>
        <div style={styles.detailItem}>
          <strong>地區: </strong>
          <span>{restaurant.country}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>評分: </strong>
          <span>
            {"⭐".repeat(restaurant.score)}
            {"☆".repeat(6 - restaurant.score)}
          </span>
        </div>
        <div style={styles.detailItem}>
          <strong>平均消費: </strong>
          <span>${restaurant.average}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>地址: </strong>
          <span>{restaurant.address}</span>
        </div>
        <div style={styles.detailItem}>
          <strong>營業時間: </strong>
          <span>
            {/* 如果 showAllHours 為 true，顯示全部營業時間 */}
            {showAllHours ? (
              // 顯示全部營業時間頁面
              <div style={styles.allHoursContainer}>
                {Object.entries(formattedBusinessHours).map(([day, times], index) => (
                  <div key={index} style={styles.dayBlock}>
                    <strong>{day}:</strong>
                    {times.map((time, timeIndex) => (
                      <span key={timeIndex}>
                        {timeIndex > 0 ? "，" : " "}{time}
                      </span>
                    ))}
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowAllHours(false)}
                  sx={{ marginTop: 2 }}
                >
                  關閉
                </Button>
              </div>
            ) : (
              // 顯示今天的營業時間
              Object.entries(todayFormattedHours).map(([day, times], index) => (
                <div key={index}>
                  <span>{day} </span>
                  {times.map((time, timeIndex) => (
                    <span key={timeIndex}>
                      {timeIndex > 0 ? "，" : " "}{time}
                    </span>
                  ))}
                  {times.length > 1 && (
                    <IconButton
                      onClick={() => setShowAllHours(true)}
                      size="small"
                      sx={{
                        marginLeft: 1,
                        padding: 0,
                        fontSize: "1rem",
                        color: "#007BFF",
                        transition: "color 0.3s ease",
                        "&:hover": { color: "#0056b3" },
                      }}
                    >
                      <ArrowDropDown />
                    </IconButton>
                  )}
                </div>
              ))
            )}
          </span>
        </div>
        <div>
          <Item1 onClick={handleBookRedirect}>預約</Item1>
          <Item1 onClick={handleOpenDialog}>評論</Item1>
        </div>
      </div>

      {/* 評論彈窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>留下您的評論</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            max={5}
          />
          <TextField
            label="您的評論"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmitReview}>提交</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const styles = {
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "50%",
    height: "90%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  restaurantName: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  detailItem: {
    fontSize: "1.1rem",
    color: "#555",
    display: "flex",
    alignItems: "center",
  },
  allHoursContainer: {
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
  },
  dayBlock: {
    marginBottom: "8px",
  },
};

export default RestaurantInfo;
