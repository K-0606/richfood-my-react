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
  const { user, logout } = useUser(); // 从 context 中獲取 user 
  const [userData, setUserData] = useState(null);


  // 跳轉
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
    logout();
    navigate("/");
    // const endpoint =
    //   user?.userType === "member"
    //     ? "http://localhost:8080/User/logout"
    //     : "http://localhost:8080/store/storeLogOut";

    // fetch(endpoint, { method: "POST", credentials: "include" })
    //   .then(() => console.log("登出成功"))
    //   .catch((err) => console.error("登出失敗", err));
  };

  const fetchMemberData = async () => {
    console.log("刷新會員");
    try {
      const response = await fetch("http://localhost:8080/User/getUserDetails", {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("重新取得會員資料:", userData);

        if (userData.icon) {
          userData.icon = `http://localhost:8080${userData.icon}?t=${Date.now()}`;
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
      if(user?.userType){

      
      if (user?.userType === "member") {
        userData = await fetchMemberData();
        if (userData) {
          console.log("設定 userData:", userData);
          userData.iconUrl = userData.icon
            ? `http://localhost:8080${userData.icon}?t=${Date.now()}`
            : null;
          setUserData(userData); // 更新用戶資訊資料
        }

      } else  {
        userData = await fetchStoreData();
      }
    }


    } catch (error) {
      console.error("刷新會員資訊錯誤:", error);
    }
  };

  // 監聽會員更新事件
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

  //監聽Storeheader更新事件
  useEffect(() => {

    fetchUserData();

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
                  alt={
                    // user.userType === "member" ? user.name : user.restaurants.name
                    currentUser?.name || "用户"
                    }
                  src={
                    user.userType === "member" ? user.avatar : JSON.parse(currentUser.icon)
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
