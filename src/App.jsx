// src/App.jsx
import React from 'react';
import LoginPage from './pages/LoginPage';
import './App.css';

import MemberRegister from './pages/MemberRegister';
import MemberLoginPage from './pages/MemberLoginPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeTop from './pages/HomeTop.jsx';
import SystemManage from './pages/SystemManage.jsx';
import BookPage from './pages/BookPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Header from './components/layout/Header.jsx';
import HomePicture1 from './pages/HomeAll/HomePicture1.jsx';
import HomePicture2 from './pages/HomeAll/HomePicture2.jsx';
import HomePicture3 from './pages/HomeAll/HomePicture3.jsx';
import HomeComment from './pages/HomeAll/HomeComment.jsx';
import Footer from './components/layout/Footer.jsx';
import HomeHeroImage from './pages/HomeAll/HomeHeroImage.jsx';
import SearchStore from './pages/SearchStore.jsx';
import SearchPicture from './pages/SearchStoreAll/SearchPicture.jsx';
import StorePage from './pages/StorePage.jsx';
import StorePage3 from './pages/StorePage/StorePage3.jsx';

const router = createBrowserRouter([
  {
    path: "/book",
    element: <BookPage />,
  },
  {
    path: "/contactUs",
    element: <ContactUsPage />,
  },
  {
    path: "/HomeTop",
    element: <HomeTop />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/memberLoginPage",
    element: <MemberLoginPage />,
  },
  {
    path: "/memberRegister",
    element: <MemberRegister />,
  },
  {
    path: "/paymentPage",
    element: <PaymentPage />,
  },
  {
    path: "/systemManage",
    element: <SystemManage />,
  },
  // Header 和 Footer
  {
    path: "/Header",
    element: <Header />,
  },
  {
    path: "/Footer",
    element: <Footer />,
  },
  // 首页相关页面
  {
    path: "/HomePicture1",
    element: <HomePicture1 />,
  },
  {
    path: "/HomePicture2",
    element: <HomePicture2 />,
  },
  {
    path: "/HomePicture3",
    element: <HomePicture3 />,
  },
  {
    path: "/HomeHeroImage",
    element: <HomeHeroImage />,
  },
  {
    path: "/SearchStore",
    element: <SearchStore />,
  },
  {
    path: "/SearchPicture",
    element: <SearchPicture/>,
  },
  {
    path: "/StorePage",
    element: <StorePage/>,
  },
  {
    path: "/StorePage3",
    element: <StorePage3/>,
  },
  {
    path: "/HomeComment",
    element: <HomeComment/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
