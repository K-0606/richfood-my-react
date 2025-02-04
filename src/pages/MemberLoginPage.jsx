import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import axios from 'axios';

// 子组件
import Comments from './MemberComponents/Comments';
import Collections from './MemberComponents/Collections';
import Coupons from './MemberComponents/Coupons';
import Reservations from './MemberComponents/Reservations';
import MemberProfile from './MemberComponents/MemberProfile';

const Home = () => {
  const [activeContent, setActiveContent] = useState('comments'); // 默认显示 我的评论
  const [isEditing, setIsEditing] = useState(false); // 控制是否显示编辑模式
  const [isChangingPassword, setIsChangingPassword] = useState(false); // 控制是否显示修改密码块
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null); // 控制错误信息
  const [loading, setLoading] = useState(false); // 加载状态
  const [reviews, setReviews] = useState([]); // 存放評論數據
  const [collections, setCollections] = useState([]); // 存放珍藏數據

  // 会员数据初始化
  const [memberData, setMemberData] = useState({
    id: '',
    name: '',
    gender: '',
    account: '',
    email: '',
    phone: '',
    avatarUrl: '',
    password: '',
  });

  // 拉取会员数据
  useEffect(() => {
    if (activeContent === 'profile') {
      setLoading(true);
      axios
        .get('http://localhost:8080/User/getUserDetails', { withCredentials: true })
        .then((response) => {
          const data = response.data;
          setMemberData({
            id: data.userId || '',
            name: data.name || '',
            gender: data.gender || 'other',
            account: data.userAccount || '',
            email: data.email || '',
            phone: data.tel || '',
            avatarUrl: data.icon ? `http://localhost:8080${data.icon}` : '',
          });
          setLoading(false);
        })
        .catch((err) => {
          setError('无法加载会员数据，请稍后再试');
          setLoading(false);
        });
    }
  }, [activeContent]);

  // 拉取评论数据
  useEffect(() => {
    if (activeContent === 'comments') {
      setLoading(true);
      axios
        .get('http://localhost:8080/Reviews/myReviews', { withCredentials: true })
        .then((response) => {
          const formattedReviews = response.data.map((review) => ({
            restaurantName: `餐廳 ${review.restaurantId}`,
            restaurantId: review.restaurantId,
            rating: review.rating,
            content: review.content,
            date: new Date(review.createdAt).toLocaleDateString(),
          }));
          setReviews(formattedReviews);
          setLoading(false);
        })
        .catch((err) => {
          setError('无法加载评论数据，请稍后再试');
          setLoading(false);
        });
    }
  }, [activeContent]);

  // 拉取珍藏数据
  useEffect(() => {
    if (activeContent === 'collections') {
      setLoading(true);
      axios
        .get('http://localhost:8080/favorite/restaurants', { withCredentials: true })
        .then((response) => {
          setCollections(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('无法加载珍藏数据，请稍后再试');
          setLoading(false);
        });
    }
  }, [activeContent]);

  // 處理更新會員數據
  const handleUpdateMemberData = (updatedData) => {
    const formData = new FormData();
    console.log("收到的 updatedData:", updatedData); // 確認頭像數據是否存在
    formData.append('userId', memberData.id);
    if (updatedData.name) formData.append('name', updatedData.name);
    if (updatedData.phone) formData.append('tel', updatedData.phone);
    if (updatedData.email) formData.append('email', updatedData.email);
    if (updatedData.gender) formData.append('gender', updatedData.gender);
    if (updatedData.iconFile) formData.append('iconFile', updatedData.iconFile);
  
    setLoading(true);
  
    axios
      .put('http://localhost:8080/User/updateUser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      .then((response) => {
        alert(response.data.message || '資料更新成功');
        setError(null);
  
        // 更新用戶數據
        setMemberData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
  
        // 如果有头像更新，设置新的头像 URL 并附加时间戳
        if (updatedData.iconFile) {
          const updatedAvatarUrl = `http://localhost:8080${response.data.icon}?t=${Date.now()}`;
          setAvatarUrl(updatedAvatarUrl); // 单独更新头像 URL
        }
  
        // 触发事件通知 Header 更新
        const event = new Event('updateHeader');
        console.log('触发 updateHeader 事件');
        window.dispatchEvent(event);
      })
      .catch((err) => {
        console.error('更新失败:', err.response || err.message);
        setError('更新失敗，請稍後再試');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  

  return (
    <>
      <Header key={memberData?.id || memberData?.name} />
      <Box sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="center" sx={{ marginBottom: 4 }}>
          <Button variant="outlined" onClick={() => setActiveContent('comments')}>
            我的評論
          </Button>
          <Button variant="outlined" onClick={() => setActiveContent('collections')}>
            我的珍藏
          </Button>
          <Button variant="outlined" onClick={() => setActiveContent('coupons')}>
            我的餐券
          </Button>
          <Button variant="outlined" onClick={() => setActiveContent('reservations')}>
            我的訂位
          </Button>
          <Button variant="outlined" onClick={() => setActiveContent('profile')}>
            會員資料
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : activeContent === 'profile' ? (
          <MemberProfile
            memberData={memberData}
            onSave={handleUpdateMemberData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isChangingPassword={isChangingPassword}
            setIsChangingPassword={setIsChangingPassword}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmNewPassword={confirmNewPassword}
            setConfirmNewPassword={setConfirmNewPassword}
            passwordError={passwordError}
          />
        ) : activeContent === 'comments' ? (
          <Comments reviews={reviews} error={error} />
        ) : activeContent === 'collections' ? (
          <Collections collections={collections} />
        ) : activeContent === 'coupons' ? (
          <Coupons />
        ) : (
          <Reservations />
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Home;
