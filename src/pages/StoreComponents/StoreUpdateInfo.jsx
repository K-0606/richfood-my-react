import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography, Avatar } from '@mui/material';

const StoreUpdateInfo = ({ onUpdateStoreData }) => {
  const [editStoreData, setEditStoreData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isPasswordChange, setIsPasswordChange] = useState(false); // 控制顯示新密碼欄位
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false); // 密碼是否更新過
  const [storeId, setStoreId] = useState(null); 

  //初始值
  useEffect(() => {
    const fetchStoreId = async () => {
      try {
        const response = await fetch('http://localhost:8080/store/selectStore', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log("取得的 storeId:", data.storeId);
        setStoreId(data.storeId); // 更新 storeId
      } catch (error) {
        console.error("取得 storeId 失敗:", error.message);
        alert("無法取得 storeId，請稍後再試");
      }
    };
  
    fetchStoreId();
  }, []);


  useEffect(() => {

    const fetchStoreData = async () => {
      if(!storeId){return}
      try {
        const response = await fetch(`http://localhost:8080/store/getStore?storeId=${storeId}`, {
          method: "GET",
          credentials: "include", // 攜帶 Cookie
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log("取得的店家資料:", data);

        // 將資料填入表單
        setEditStoreData({
          name: data.restaurants.name,
          address: data.restaurants.country+
                   data.restaurants.district+
                   data.restaurants.address,
          businessHours: '',
          phone: data.restaurants.phone,
        });

        setAvatar(''); // 如果有頭像的欄位
      } catch (error) {
        console.error("資料抓取失敗:", error.message);
        alert("無法取得店家資料，請稍後再試");
      }
    };

    fetchStoreData();
  }, [storeId]);



  // 當欄位變更時更新對應狀態
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStoreData({ ...editStoreData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setAvatar(base64Data);
        // setAvatar(reader.result); // 更新預覽圖
      };
      reader.readAsDataURL(file);
    }
  };

  // 提交更新
  const handleSubmit = async () => {
    // 更新資料
    const updatedData = {
      ...editStoreData,
      avatar, // 更新頭像
    };

    try {
      const response = await fetch(`http://localhost:8080/store/icon/${storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(avatar),  // 傳送 BASE64 字串
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("更新成功", data);
        alert('頭像更新成功');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("錯誤:", error.message);
      alert("更新失敗，請稍後再試");
    }




    // 模擬回傳更新的資料
    console.log("更新的店家資料: ", updatedData);

    // 更新資料到父組件
    onUpdateStoreData(updatedData);

    // 提示成功
    alert('店家資訊已更新');
  };

  // 確認修改密碼
  const handleConfirmPasswordChange = async () => {
    // 密碼校驗
    if (newPassword && newPassword !== confirmPassword) {
      alert('新密碼和確認密碼不一致');
      return;
    }

    // 更新密碼
    const updatedData = {
      ...editStoreData,
      avatar, // 頭像保持不變
      newPassword, // 新密碼儲存
    };

    // 模擬回傳更新的資料
    console.log("更新的密碼: ", newPassword);

    // 更新密碼並回傳到父組件
    const requestData = {
      password: newPassword
      };
    try {
      const response = await fetch('http://localhost:8080/store/updateStore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        credentials: 'include', // 確保攜帶 Cookie
        body: JSON.stringify(requestData),
      });
      console.log('發送的請求資料：', requestData);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message );
      }
  
        const result = await response.json();
        console.log(result)
        alert("ok");
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }


    onUpdateStoreData(updatedData);

    // 密碼更新成功，隱藏密碼欄位並提示
    setIsPasswordUpdated(true);
    setIsPasswordChange(false); // 隱藏密碼欄位
    alert('密碼已成功更新');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6">更新店家資訊</Typography>

      {/* 頭像更新區塊 */}
      <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">店家頭像</Typography>
          <Avatar src={avatar} sx={{ width: 120, height: 120, mb: 2 }} />
          <Button variant="contained" component="label">
            更換頭像
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>
        </Grid>
      </Grid>

      {/* 店家資訊更新區塊 */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* 店家名稱 */}
        <Grid item xs={12}>
          <TextField
            label="店家名稱"
            variant="outlined"
            fullWidth
            value={editStoreData.name}
            name="name"
            onChange={handleChange}
          />
        </Grid>

        {/* 營業地址 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="營業地址"
            variant="outlined"
            fullWidth
            value={editStoreData.address}
            name="address"
            onChange={handleChange}
          />
        </Grid>

        {/* 營業時間 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="營業時間"
            variant="outlined"
            fullWidth
            value={editStoreData.businessHours}
            name="businessHours"
            onChange={handleChange}
          />
        </Grid>

        {/* 餐廳電話 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="餐廳電話"
            variant="outlined"
            fullWidth
            value={editStoreData.phone}
            name="phone"
            onChange={handleChange}
          />
        </Grid>

        {/* 密碼更新區塊 */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => setIsPasswordChange(true)} // 顯示新密碼欄位
            sx={{ width: "100%" }}
          >
            更改密碼
          </Button>
          {isPasswordChange && !isPasswordUpdated && (
            <>
              <TextField
                label="新密碼"
                variant="outlined"
                fullWidth
                type="password"
                value={newPassword}
                name="newPassword"
                onChange={handlePasswordChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="確認密碼"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handlePasswordChange}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleConfirmPasswordChange}
                sx={{ mt: 2 }}
              >
                確認修改密碼
              </Button>
            </>
          )}
        </Grid>

        {/* 提交按鈕 */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            更新資訊
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreUpdateInfo;
