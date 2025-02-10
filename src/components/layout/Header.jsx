import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useUser } from "../../context/UserContext"; // 引入 useUser
import "./Header.css";
import logo from "../../assets/richfoodCoverV1.png";
import LanguageSwitch from "../common/LanguageSwitch";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // 从 context 中獲取 user
  const [userData, setUserData] = useState(null);

  const handleLoginRedirect = () => navigate("/login");
  const handleHomeRedirect = () => navigate("/");
  const handleStoreRedirect = () => navigate("/SearchStore");
  const handlePopularRedirect = () => navigate(`/search?popular=true`);

  const handleProfileRedirect = () => {
    if (user?.userType === "member") {
      navigate("/MemberLogin");
    } else if (user?.userType !== "member") {
      navigate("/StoreLogin");
    } else {
      navigate("/login");
    }
  };

  // 登出
  const handleLogout = () => {
    setUserData(null);

    // 直接執行兩個登出請求
    const memberLogoutEndpoint = "http://localhost:8080/User/logout";
    const storeLogoutEndpoint = "http://localhost:8080/store/storeLogOut";

    // 執行會員登出
    fetch(memberLogoutEndpoint, { method: "POST", credentials: "include" })
      .then(() => {
        console.log("會員登出成功");
      })
      .catch((err) => console.error("會員登出失敗", err));

    // 執行店家登出
    fetch(storeLogoutEndpoint, { method: "POST", credentials: "include" })
      .then(() => {
        console.log("店家登出成功");
        logout(); // 清空 user 資料
        navigate("/"); // 導向首頁
      })
      .catch((err) => console.error("店家登出失敗", err));

    logout(); // 清空 user 資料
    navigate("/"); // 導向首頁
  };

  const fetchMemberData = async () => {
    console.log("刷新會員");
    try {
      const response = await fetch(
        "http://localhost:8080/User/getUserDetails",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const userData = await response.json();
        console.log("重新取得會員資料:", userData);

        if (userData.icon) {
          userData.icon = `http://localhost:8080${
            userData.icon
          }?t=${Date.now()}`;
        }

        return userData;
      } else {
        console.error("取得會員資料失敗");
      }
    } catch (error) {
      console.error("取得會員資料錯誤:", error);
    }
  };

  const fetchStoreData = async () => {
    console.log("刷新店家資料");
    try {
      const response = await fetch("http://localhost:8080/store/selectStore", {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();

        console.log("重新取得的店家資料:", userData);
        setUserData(userData);

        // return userData;
        console.log("重新取得的店家资料:", userData);

        // // 拼接完整头像 URL 并避免缓存
        // if (userData.icon) {
        //   userData.icon = `http://localhost:8080${
        //     userData.icon
        //   }?t=${Date.now()}`;
        // }

        return userData;
      } else {
        console.error("取得店家資料失敗");
      }
    } catch (error) {
      console.error("取得店家資料錯誤:", error);
    }
  };

  const fetchUserData = async () => {
    console.log("刷新會員資料");
    try {
      let userData;

      if (user?.userType === "member") {
        userData = await fetchMemberData();
        if (userData) {
          console.log("設定 userData:", userData);
          userData.iconUrl = userData.icon
            ? `http://localhost:8080${userData.icon}?t=${Date.now()}`
            : null;
          setUserData(userData); // 更新用戶資訊資料
        }
      } else {
        console.log("不存在");
        userData = await fetchStoreData();
      }

      // if (userData) {
      //   console.log("设置 userData:", userData);
      //   // 生成头像 URL，避免重复添加时间戳
      //   userData.iconUrl = userData.icon
      //     ? `http://localhost:8080${userData.icon}?t=${Date.now()}`
      //     : null;

      //   setUserData(userData); // 更新用户数据状态
      // }
    } catch (error) {
      console.error("刷新會員資訊錯誤:", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]); // 監聽 user 變化

  // 監聽會員更新事件
  useEffect(() => {
    const handleUpdateHeader = () => {
      console.log("接收到 updateHeader 事件");
      fetchUserData();
    };

    window.addEventListener("updateHeader", handleUpdateHeader);

    return () => {
      window.removeEventListener("updateHeader", handleUpdateHeader);
    };
  }, []);

  //監聽Storeheader更新事件
  useEffect(() => {
    // fetchUserData();

    const handleUpdateStoreHeader = () => {
      console.log("接收到 updateHeader 事件");
      fetchUserData();
    };

    window.addEventListener("updateStoreHeader", handleUpdateStoreHeader);

    return () => {
      window.removeEventListener("updateStoreHeader", handleUpdateStoreHeader);
    };
  }, []);

  // 使用 userData 或 user
  const currentUser = userData || user;

  return (
    <div className="header">
      <div className="left-container">
        <img
          className="logoImg"
          src={logo}
          alt="logo"
          onClick={handleHomeRedirect}
        />
        {/* <h1 className="logo" onClick={handleHomeRedirect}>
          腹餓帶
        </h1> */}
      </div>

      <div className="right-container">
        <Stack spacing={2} direction="row">
          <Button
            variant="text"
            onClick={handleStoreRedirect}
            style={styles.btn}
          >
            所有餐廳
          </Button>
          <Button
            variant="text"
            onClick={handlePopularRedirect}
            style={styles.btn}
          >
            熱門餐廳
          </Button>
          <Button
            variant="text"
            onClick={handlePopularRedirect}
            style={styles.btn}
          >
            關於我
          </Button>
          <LanguageSwitch />
          {currentUser ? (
            <div className="profile-container">
              <Button
                className="member"
                variant="contained"
                onClick={handleProfileRedirect}
              >
                <Avatar
                  alt={currentUser?.name || "用户"}
                  src={
                    user.userType === "member"
                      ? currentUser.icon
                      : JSON.parse(currentUser.icon)
                  }
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                {currentUser?.userType === "member"
                  ? currentUser?.name || "会员"
                  : currentUser?.restaurants?.name || "店家"}
              </Button>
              <Button
                className="member"
                variant="contained"
                onClick={handleLogout}
              >
                登出
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              onClick={handleLoginRedirect}
              sx={{
                backgroundColor: "#000000", // 按钮保持黑色背景
                color: "white", // 文字颜色为白色
                "&:hover": {
                  backgroundColor: "#151515b6", // Hover 时的背景色
                },
                "&:focus": {
                  outline: "none", // 去除聚焦边框
                  backgroundColor: "#000000", // 保持黑色背景
                },
                "&:active": {
                  backgroundColor: "#000000", // 防止按下时背景变蓝
                  transform: "scale(1)", // 按下时不变形
                },
              }}
            >
              會員/店家登入
            </Button>
          )}
        </Stack>
      </div>
    </div>
  );
};

const styles = {
  btn: {
    backgroundColor: "white", // Hover 时的背景色
    color: "black", // 文字颜色为黑色
    "&:hover": {
      outline: "none", // 去除聚焦边框
      backgroundColor: "gray", // Hover 时的背景色
    },
    "&:focus": {
      outline: "none", // 去除聚焦边框
      backgroundColor: "#000000", // 保持黑色背景
    },
    "&:active": {
      outline: "none", // 去除聚焦边框
      backgroundColor: "#c6c6c6b6", // 按下时的背景色
      transform: "scale(1)", // 按下时不变形
    },
  },
};

export default Header;
