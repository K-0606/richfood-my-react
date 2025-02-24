import React, { useState, useEffect} from "react";
import { Box, Button, Grid, TextField, Typography, Avatar, Divider } from '@mui/material';

const StoreUpdateInfo = ({ storeData, onUpdateStoreData }) => {
  const [editStoreData, setEditStoreData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isPasswordChange, setIsPasswordChange] = useState(false); // 控制顯示新密碼欄位
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false); // 密碼是否更新過
  const [storeId, setStoreId] = useState(null); 
  const [restaurantId, setRestaurantId] = useState(null); 

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
        // console.log("取得的 storeId:", data.storeId);
        setStoreId(data.storeId); // 更新 storeId
        setRestaurantId(data.restaurantId);
      } catch (error) {
        console.error(error.message);
        alert("無法取得，請稍後再試");
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
          country:data.restaurants.country,
          district: data.restaurants.district,
          address: data.restaurants.address,
          phone: data.restaurants.phone
        });

        // setAvatar(data.icon); // 如果有頭像的欄位
        if(data.icon!=null){
          setAvatar(data.icon.replace(/^"|"$/g, ''));
        }
        
      } catch (error) {
        console.error("資料抓取失敗:", error.message);
        alert("無法取得店家資料，請稍後再試");
      }
    };

    fetchStoreData();
  }, [storeId]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStoreData({ ...editStoreData, [name]: value });
  };

  const handleBusinessHoursChange = (day, index, value) => {
    const newBusinessHours = [...editStoreData.businessHours];
    if (!Array.isArray(newBusinessHours[day])) {
      newBusinessHours[day] = [];
    }
    newBusinessHours[day][index] = value;
    setEditStoreData({ ...editStoreData, businessHours: newBusinessHours });
  };

  const handleAddTimeSlot = (day) => {
    const newBusinessHours = [...editStoreData.businessHours];
    if (!Array.isArray(newBusinessHours[day])) {
      newBusinessHours[day] = [];
    }
    newBusinessHours[day].push(''); // 新增一個空的時段
    setEditStoreData({ ...editStoreData, businessHours: newBusinessHours });
  };

  const handleRemoveTimeSlot = (day, index) => {
    const newBusinessHours = [...editStoreData.businessHours];
    if (!Array.isArray(newBusinessHours[day])) {
      newBusinessHours[day] = [];
    }
    newBusinessHours[day].splice(index, 1);
    setEditStoreData({ ...editStoreData, businessHours: newBusinessHours });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
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

  const handleSubmit = async () => {
    // // 保證評論數量、珍藏數量和評分不丟失
    // const updatedData = {
    //   ...editStoreData,
    //   avatar,
    //   reviewsCount: storeData.reviewsCount,  // 保持評論數量
    //   favoritesCount: storeData.favoritesCount,  // 保持珍藏數量
    //   averageRating: storeData.averageRating,  // 保持評分
    // };
  
    // // 輸出修改前的資料和修改後的資料（方便調試）
    // console.log('更新前的店家資訊:', storeData); 
    // console.log('更新後的店家資訊:', updatedData);
    const updatedData = {
      restaurantId: restaurantId, // 假設 storeId 是 restaurantId
      name: editStoreData.name,
      country: editStoreData.country,
      district: editStoreData.district,
      address: editStoreData.address,
      phone: editStoreData.phone,
    };
  
    console.log('發送到後端的資料:', updatedData);

    try {
      // 更改資料
      const responseData = await fetch('http://localhost:8080/restaurants/saveResraurantData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 確保攜帶 Cookie
        body: JSON.stringify(updatedData),
      });
    
      if (!responseData.ok) {
        const errorData = await responseData.json();
        throw new Error(errorData.message || '更新失敗');
      }
    
      const result = await responseData.json();
      console.log('後端回傳的結果:', result);
      alert('店家資訊已成功更新');
    
      // 更改大頭貼
      const responseAvatar = await fetch(`http://localhost:8080/store/icon/${storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(avatar),  // 傳送 BASE64 字串
      });
    
      if (responseAvatar.ok) {
        const data = await responseAvatar.json();
        console.log("更新成功", data);
        alert('頭像更新成功');
      } else {
        const errorData = await responseAvatar.json();
        throw new Error(errorData.message);
      }
    
    } catch (error) {
      console.error('錯誤:', error.message);
      alert('更新失敗，請稍後再試');
    }

    // 更新資料
    onUpdateStoreData(updatedData);
  
    // 提示使用者店家資訊已更新
    alert('店家資訊已更新');
    //頁面F5
    window.location.reload();

    // 新增監聽事件
    const event = new Event('updateStoreHeader');
    console.log(' updateStoreHeader 事件');
    window.dispatchEvent(event);
  };
  

  const handleConfirmPasswordChange = async () => { 
    console.log('更新前的店家資訊:', storeData); // 輸出修改前的資料
    if (newPassword && newPassword !== confirmPassword) {
      alert('新密碼和確認密碼不一致');
      return;
    }
  
    // 保留原來的店家資訊，並只更新密碼
    // const updatedData = {
    //   ...editStoreData,
    //   avatar,
    //   newPassword,
    //   reviewsCount: storeData.reviewsCount,  // 保持評論數量
    //   favoritesCount: storeData.favoritesCount,  // 保持珍藏數量
    //   averageRating: storeData.averageRating,  // 保持評分
    // };
    // console.log('更新後的店家資訊:', updatedData); // 輸出更新後的資料
  
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


    onUpdateStoreData(requestData);
    setIsPasswordUpdated(true);
    setIsPasswordChange(false);
    alert('密碼已成功更新');
  };
  

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>更新店家資訊</Typography>

      {/* 頭像更新區塊 */}
      <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>店家頭像</Typography>
          <Avatar src={avatar} sx={{ width: 120, height: 120, mb: 2 }} />
          <Button variant="contained" component="label" sx={{ width: '100%' }}>
            更換頭像
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* 店家資訊更新區塊 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* 店家名稱 */}
        <Grid item xs={12}>
          <TextField
            label="店家名稱"
            variant="outlined"
            fullWidth
            value={editStoreData.name}
            name="name"
            onChange={handleChange}
            InputLabelProps={{
              shrink: editStoreData.address !=="",
            }}
            sx={{ backgroundColor: 'white' }}
          />
        </Grid>

        {/* 營業地址 */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="縣市"
            variant="outlined"
            fullWidth
            value={editStoreData.country}
            name="country"
            onChange={handleChange}
            InputLabelProps={{
              shrink: editStoreData.address !=="",
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="區域"
            variant="outlined"
            fullWidth
            value={editStoreData.district}
            name="district"
            onChange={handleChange}
            InputLabelProps={{
              shrink: editStoreData.address !=="",
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="詳細地址"
            variant="outlined"
            fullWidth
            value={editStoreData.address}
            name="address"
            onChange={handleChange}
            InputLabelProps={{
              shrink: editStoreData.address !=="",
            }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* 營業時間更新區塊
      <Typography variant="h6" sx={{ mb: 2 }}>營業時間</Typography>
      {['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'].map((day, index) => (
        <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={2}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{day}</Typography>
          </Grid>

          <Grid item xs={8}>
            {(Array.isArray(editStoreData.businessHours[index]) ? editStoreData.businessHours[index] : []).map((time, timeIndex) => (
              <Grid container spacing={1} key={timeIndex}>
                <Grid item xs={5}>
                  <TextField
                    label="營業時間"
                    variant="outlined"
                    fullWidth
                    value={time}
                    onChange={(e) => handleBusinessHoursChange(index, timeIndex, e.target.value)}
                  />
                </Grid>

                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {editStoreData.businessHours[index].length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveTimeSlot(index, timeIndex)}
                    >
                      刪除
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleAddTimeSlot(index)}
              sx={{ width: '100%' }}
            >
              增加時段
            </Button>
          </Grid>
        </Grid>
      ))}

      <Divider sx={{ my: 3 }} /> */}

      {/* 密碼更新區塊 */}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={() => setIsPasswordChange(true)} // 顯示新密碼欄位
          sx={{ width: '100%', mb: 2 }}
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
    </Box>
  );
};

export default StoreUpdateInfo;
