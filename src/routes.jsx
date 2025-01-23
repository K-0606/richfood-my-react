// src/routes.js
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import MemberRegister from './pages/MemberRegister';
import MemberLoginPage from './pages/MemberLoginPage';
import SystemManage from './pages/SystemManage';
import BookPage from './pages/BookPage';
import ContactUsPage from './pages/ContactUsPage';
import PaymentPage from './pages/PaymentPage';
import ErrorPage from './pages/ErrorPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePicture1 from './pages/HomeAll/HomePicture1';
import HomePicture2 from './pages/HomeAll/HomePicture2';
import HomePicture3 from './pages/HomeAll/HomePicture3';
import HomeHeroImage from './pages/HomeAll/HomeHeroImage';
import SearchStore from './pages/SearchStore';
import MemberProfile from './pages/MemberComponents/MemberProfile';
import Comments from './pages/MemberComponents/Comments';
import Collections from './pages/MemberComponents/Collections';
import Coupons from './pages/MemberComponents/Coupons';
import Reservations from './pages/MemberComponents/Reservations';
import MyRecommend from './pages/MyRecommend';
import StorePage from './pages/StorePage';
import PopularPage from './pages/PopularPage';
import StoreLoginPage from './pages/StoreLoginPage';
import StoreQRCodeScanner from './pages/StoreComponents/StoreQRCodeScanner';
import Test2 from './pages/SearchStoreAll/Test2';
import Test3 from './pages/Test3';
import Test4 from './pages/Test4';
import UseCoupon from './pages/MemberComponents/UseCoupon';

// 定義路由配置
const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/memberLogin', element: <MemberLoginPage /> },
  { path: '/memberRegister', element: <MemberRegister /> },
  { path: '/myRecommend', element: <MyRecommend /> },
  { path: '/paymentPage', element: <PaymentPage /> },
  { path: '/storeLogin', element: <StoreLoginPage /> },
  { path: '/systemManage', element: <SystemManage /> },
  { path: '/PopularPage', element: <PopularPage /> },
  { path: '/StoreQRCodeScanner', element: <StoreQRCodeScanner /> },
  { path: '/contactUs', element: <ContactUsPage /> },
  { path: '/StorePage/book', element: <BookPage /> },
  
  // Members-related routes
  { path: '/profile', element: <MemberProfile /> },
  { path: '/comments', element: <Comments /> },
  { path: '/collections', element: <Collections /> },
  { path: '/coupons', element: <Coupons /> },
  { path: '/reservations', element: <Reservations /> },
  { path: '/use-coupon/:couponId', element: <UseCoupon /> },
  
  // Miscellaneous
  { path: '/Header', element: <Header /> },
  { path: '/Footer', element: <Footer /> },
  { path: '/HomePicture1', element: <HomePicture1 /> },
  { path: '/HomePicture2', element: <HomePicture2 /> },
  { path: '/HomePicture3', element: <HomePicture3 /> },
  { path: '/HomeHeroImage', element: <HomeHeroImage /> },
  { path: '/SearchStore', element: <SearchStore /> },
  { path: '/StorePage', element: <StorePage /> },
  { path: '/Test2', element: <Test2 /> },
  { path: '/Test3', element: <Test3 /> },
  { path: '/Test4', element: <Test4 /> },
];

export default routes;
