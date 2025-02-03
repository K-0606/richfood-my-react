import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useUser } from "../../context/UserContext"; // 引入 useUser
import "./Header.css";
import logo from "../../assets/richfoodCoverV1.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // 从 context 中获取 user 数据
  const [userData, setUserData] = useState(null);


  // 跳转逻辑
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

  // 登出逻辑
  const handleLogout = () => {
    logout();
    navigate("/");
    const endpoint =
      user?.userType === "member"
        ? "http://localhost:8080/User/logout"
        : "http://localhost:8080/store/storeLogOut";

    fetch(endpoint, { method: "POST", credentials: "include" })
      .then(() => console.log("登出成功"))
      .catch((err) => console.error("登出失败", err));
  };

  const fetchMemberData = async () => {
    console.log("刷新会员数据");
    try {
      const response = await fetch("http://localhost:8080/User/getUserDetails", {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("重新取得的会员资料:", userData);

        // 拼接完整头像 URL 并避免缓存
        if (userData.icon) {
          userData.icon = `http://localhost:8080${userData.icon}?t=${Date.now()}`;
        }

        return userData;
      } else {
        console.error("获取会员数据失败");
      }
    } catch (error) {
      console.error("获取会员数据出错:", error);
    }
  };

  const fetchStoreData = async () => {
    console.log("刷新店家数据");
    try {
      const response = await fetch("http://localhost:8080/store/selectStore", {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("重新取得的店家资料:", userData);

        // 拼接完整头像 URL 并避免缓存
        if (userData.icon) {
          userData.icon = `http://localhost:8080${userData.icon}?t=${Date.now()}`;
        }

        return userData;
      } else {
        console.error("获取店家数据失败");
      }
    } catch (error) {
      console.error("获取店家数据出错:", error);
    }
  };

  const fetchUserData = async () => {
    console.log("刷新用户数据");
    try {
      let userData;

      if (user?.userType === "member") {
        userData = await fetchMemberData();
      } else if (user?.userType === "store") {
        userData = await fetchStoreData();
      }

      if (userData) {
        console.log("设置 userData:", userData);
        // 生成头像 URL，避免重复添加时间戳
        userData.iconUrl = userData.icon
          ? `http://localhost:8080${userData.icon}?t=${Date.now()}`
          : null;
  
        setUserData(userData); // 更新用户数据状态
      }
    } catch (error) {
      console.error("刷新用户数据出错:", error);
    }
  };



  // 监听更新事件
  useEffect(() => {

    fetchUserData();

    const handleUpdateHeader = () => {
      console.log("接收到 updateHeader 事件");
      fetchUserData();
    };

    window.addEventListener("updateHeader", handleUpdateHeader);

    return () => {
      window.removeEventListener("updateHeader", handleUpdateHeader);
    };
  }, []);

  // 使用 userData 或全局 user 数据
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
        <h1 className="logo" onClick={handleHomeRedirect}>
          腹餓帶
        </h1>
      </div>

      <div className="right-container">
        <Stack spacing={2} direction="row">
          <Button variant="text" onClick={handleStoreRedirect}>
            所有餐廳
          </Button>
          <Button variant="text" onClick={handlePopularRedirect}>
            熱門餐廳
          </Button>
          <Button variant="text" onClick={handlePopularRedirect}>
            關於我
          </Button>

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

                    user.userType === "member" ? currentUser?.icon : JSON.parse(user.icon)

                    // currentUser?.icon || "" // 默认头像路径
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
            <Button variant="contained" onClick={handleLoginRedirect}>
              會員/店家登入
            </Button>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Header;
