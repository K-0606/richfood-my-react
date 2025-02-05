import React, { useState, useEffect } from "react";
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

const RestaurantInfo = React.memo(({ restaurant, onReviewSubmitted }) => {
  const { user } = useUser(); // 使用 useUser 來獲取當前的用戶資料
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(2); // 初始評分為2顆星
  const [comment, setComment] = useState("");
  const [isFavorited, setIsFavorited] = useState(false); // 控制愛心是否填滿
  const [showAllHours, setShowAllHours] = useState(false); // 控制是否顯示全部營業時間
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);// 控制是否是編輯模式
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

  const handleOpenDialog = (editMode = false) => {
    if (!user) {
      alert("請先登入！");
      return;
    }

    setOpenDialog(true);
    setIsEditing(editMode);

    if (editMode) {
      // 編輯模式 → 帶入舊的評分與評論，若 userReview 不存在就給預設值
      setRating(userReview ? userReview.rating : 2);
      setComment(userReview ? userReview.content : "");
    } else {
      // 新增模式 → 都給初始值
      setRating(2);
      setComment("");
    }
  };


  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/Reviews/restaurant/${restaurant.restaurantId}/user/${user.userId}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 404) {
            // 如果後端回傳 404，代表使用者還沒有評論，設置為 null
            return null;
          }
          return res.json();
        })
        .then((data) => {
          setUserReview(data); // 若 data 為 null，則 userReview 也會變成 null
        })
        .catch((error) => console.error("獲取評論失敗：", error));
    }
  }, [restaurant.restaurantId, user, onReviewSubmitted]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(2); // 重設評分
    setComment(""); // 重設評論
    setIsEditing(false);
  };
  // 提交新的評論
  const handleSubmitReview = async () => {
    if (!comment.trim() || rating === 0) {
      alert("請填寫完整的評論內容和評分！");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/Reviews/restaurant/${restaurant.restaurantId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content: comment, rating }),
        }
      );

      if (!response.ok) throw new Error(await response.text());

      alert("評論提交成功！");

      // 1️⃣ **等待 1 秒，確保後端數據更新**
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 2️⃣ **重新從後端獲取評論，確保評論真的存在後才變更按鈕**
      await fetchUserReview();

      handleCloseDialog(); // **確保 UI 更新後才關閉對話框**

      onReviewSubmitted && onReviewSubmitted(); // **通知父組件**
    } catch (error) {
      alert("提交評論失敗：" + error.message);
    }
  };


  const fetchUserReview = async () => {
    if (user) {
      try {
        const response = await fetch(`http://localhost:8080/Reviews/restaurant/${restaurant.restaurantId}/user/${user.userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 404) {
          setUserReview(null); // **確保 UI 保持「新增評論」狀態**
          return;
        }

        const data = await response.json();
        if (data && data.content) {
          setUserReview(data); // **確保 UI 變為「修改評論」**
        }
      } catch (error) {
        console.error("獲取評論失敗：", error);
      }
    }
  };


  // **確保 useEffect 會調用 fetchUserReview**
  useEffect(() => {
    fetchUserReview();
  }, [restaurant.restaurantId, user]);


  // 修改評論
  const handleModifyReview = async () => {
    if (!comment.trim() || rating === 0) {
      alert("請填寫完整的評論內容和評分！");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/Reviews/restaurant/${restaurant.restaurantId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content: comment, rating }),
        }
      );
      if (!response.ok) throw new Error(await response.text());

      alert("評論修改成功！");

      await fetchUserReview(); // **確保 UI 更新**

      handleCloseDialog();
      onReviewSubmitted && onReviewSubmitted();
    } catch (error) {
      alert("修改評論失敗：" + error.message);
    }
  };


  // 刪除評論
  const handleDeleteReview = async () => {
    if (!window.confirm("確定要刪除評論嗎？")) return;
    try {
      const response = await fetch(
        `http://localhost:8080/Reviews/restaurant/${restaurant.restaurantId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("刪除評論失敗");

      alert("評論已刪除！");

      await fetchUserReview(); // **確保 UI 更新**

      handleCloseDialog();
      onReviewSubmitted && onReviewSubmitted();
    } catch (error) {
      alert("刪除評論失敗：" + error.message);
    }
  };



  // **1 頁面載入時，檢查是否已收藏**
  useEffect(() => {
    if (!user || !restaurant.restaurantId) return;

    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/favorite/${restaurant.restaurantId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("無法獲取收藏狀態");
        }

        const isFavorite = await response.json(); // API 返回 true / false
        setIsFavorited(isFavorite);
      } catch (error) {
        console.error("獲取收藏狀態失敗：", error);
      }
    };

    checkFavoriteStatus();
  }, [restaurant.restaurantId, user]); // **當 `restaurantId` 或 `user` 改變時重新檢查**

  // **2️ 點擊愛心按鈕**
  const handleFavorite = async () => {
    if (!user) {
      alert("請先登入！");
      return;
    }

    try {
      if (isFavorited) {
        // ⬇ 取消收藏
        const response = await fetch(`http://localhost:8080/favorite/${restaurant.restaurantId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) throw new Error("取消收藏失敗");

        setIsFavorited(false);
        alert("已取消收藏");
      } else {
        // ⬆ 加入收藏
        const response = await fetch(`http://localhost:8080/favorite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ restaurantId: restaurant.restaurantId }),
        });

        if (!response.ok) throw new Error("加入收藏失敗");

        setIsFavorited(true);
        alert("已加入收藏");
      }
    } catch (error) {
      console.error("收藏操作失敗：", error.message);
      alert("操作失敗：" + error.message);
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
          <span>{restaurant.country}{restaurant.district}{restaurant.address}</span>
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
          {
            userReview
              ? <Item1 onClick={() => handleOpenDialog(true)}>修改評論</Item1>
              : <Item1 onClick={() => handleOpenDialog(false)}>新增評論</Item1>
          }

        </div>
      </div>

      {/* 評論彈窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "修改評論" : "新增評論"}</DialogTitle>
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
          {isEditing ? (
            // **修改模式：顯示「修改」與「刪除」**
            <>
              <Button onClick={handleModifyReview} color="primary">修改</Button>
              <Button onClick={handleDeleteReview} color="error">刪除</Button>
            </>
          ) : (
            // **新增模式：只顯示「提交」**
            <Button onClick={handleSubmitReview} color="primary">提交</Button>
          )}
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
