// src/App.jsx
import React from 'react';
import Home from './pages/Home'
// import Header from './layout/Header';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage'
import './App.css';

import MemberRegister from './pages/MemberRegister';
import MemberLoginPage from './pages/MemberLoginPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import SystemManage from './pages/SystemManage';
import BookPage from './pages/BookPage';
import ContactUsPage from './pages/ContactUsPage';
import PaymentPage from './pages/PaymentPage';
import ErrorPage from './pages/ErrorPage';
import Header from './components/layout/Header';
import HomeName1 from './pages/HomeAll/HomeName1';
import HomeName2 from './pages/HomeAll/HomeName2';
import HomeName3 from './pages/HomeAll/HomeName3';
import HomePicture1 from './pages/HomeAll/HomePicture1';
import HomePicture2 from './pages/HomeAll/HomePicture2';
import HomePicture3 from './pages/HomeAll/HomePicture3';

import Footer from './components/layout/Footer';
import HomeHeroImage from './pages/HomeAll/HomeHeroImage';
import SearchStore from './pages/SearchStore';
import MemberProfile from './pages/MemberComponents/MemberProfile';
import Comments from './pages/MemberComponents/Comments';
import Collections from './pages/MemberComponents/Collections';
import Coupons from './pages/MemberComponents/Coupons';
import Reservations from './pages/MemberComponents/Reservations';
import { AvatarProvider } from "./pages/MemberComponents/AvatarContext";  // 引入 AvatarContext
import MyRecommend from './pages/MyRecommend';
import StorePage from './pages/StorePage';
import StoreLoginPage from './pages/StoreLoginPage';


// 定義路由
const router = createBrowserRouter([
  {
    path: "/book",
    element: <BookPage />
  },
  {
    path: "/contactUs",
    element: <ContactUsPage />
  },
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />
    
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/memberLogin",
    element: <MemberLoginPage />
  },
  {
    path: "/memberRegister",
    element: <MemberRegister />
  },
  {
    path: "/myRecommend",
    element: <MyRecommend />
  },
  {
    path: "/paymentPage",
    element: <PaymentPage />
  },
  {
    path: "/storeLogin",
    element: <StoreLoginPage/>
  },
  {
    path: "/systemManage",
    element: <SystemManage />
  },
  // 珈珈---------------------------------------
  {
    path: "/Header",
    element: <Header />
  },
  {
    path: "/Footer",
    element: <Footer />
  },
  {
    path: "/HomeName1",
    element: <HomeName1 />
  },
  {
    path: "/HomeName2",
    element: <HomeName2 />
  },
  {
    path: "/HomeName3",
    element: <HomeName3 />
  },
  {
    path: "/HomePicture1",
    element: <HomePicture1 />
  },
  {
    path: "/HomePicture2",
    element: <HomePicture2 />
  },
  {
    path: "/HomePicture3",
    element: <HomePicture3 />
  },
  {
    path: "/HomeHeroImage",
    element: <HomeHeroImage />
  },
  {
    path: "/SearchStore",
    element: <SearchStore />
  },
  {
    path: "/StorePage",
    element: <StorePage/>
  },
  //memberLogin
  {
    path: "/profile",
    element: <MemberProfile />
  },
  {
    path: "/comments",
    element: <Comments />
  },
  {
    path: "/collections",
    element: <Collections />
  },
  {
    path: "/coupons",
    element: <Coupons />
  },
  {
    path: "/reservations",
    element: <Reservations />
  },
  {
    path: "/member-profile",
    element: <MemberProfile />
  },

])

// 最後包裹 AvatarProvider
function App() {
  return (
    <AvatarProvider>
      <RouterProvider router={router}  />
    </AvatarProvider>
  );;
}

export default App;
