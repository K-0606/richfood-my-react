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
// 英文版
import HomeEnglish from './pages/HomeEnglish';
import HomeName1E from './pages/HomeAllEnglish/HomeName1E';
import HomeName2E from './pages/HomeAllEnglish/HomeName2E';
import HomeName3E from './pages/HomeAllEnglish/HomeName3E';
import HomePicture1E from './pages/HomeAllEnglish/HomePicture1E';
import HomePicture2E from './pages/HomeAllEnglish/HomePicture2E';
import HomePicture3E from './pages/HomeAllEnglish/HomePicture3E';
import HomeHeroImageE from './pages/HomeAllEnglish/HomeHeroImageE';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RestaurantDetail from './pages/Restaurant/RestaurantDetail';
import MySearchField from './pages/MySearch/MySearchField';


// 定義路由配置
const routes = [
  { path: '/', element: <Home /> },
  { path: '/richfood-my-react/', element: <Home /> },
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
  { path: '/book', element: <BookPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/restaurant/:id', element: <RestaurantDetail /> },
  

  //餐廳搜尋 routes
  // { path: "/search/:region?/:type?", element: <MySearchField /> },
  // { path: "/search/:type", element: <MySearchField /> },
  // { path: "/search/:region", element: <MySearchField /> },
  
  { path: "/search", element: <MySearchField /> },

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

  // 英文版  
  { path: "/HomeEnglish", element: <HomeEnglish /> }, 
  { path: "/HomeName1E", element: <HomeName1E /> }, 
  { path: "/HomeName2E", element: <HomeName2E /> }, 
  { path: "/HomeName3E", element: <HomeName3E /> }, 
  { path: "/HomePicture1E", element: <HomePicture1E /> }, 
  { path: "/HomePicture2E", element: <HomePicture2E /> }, 
  { path: "/HomePicture3E", element: <HomePicture3E /> }, 
  { path: "/HomeHeroImageE", element: <HomeHeroImageE /> }

];

export default routes;
