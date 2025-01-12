import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage'
import './App.css';

import MemberRegister from './pages/MemberRegister';
import MemberLoginPage from './pages/MemberLoginPage'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './pages/Home';
import SystemManage from './pages/SystemManage';
import BookPage from './pages/BookPage';
import ContactUsPage from './pages/ContactUsPage';
import PaymentPage from './pages/PaymentPage';
import ErrorPage from './pages/ErrorPage';
import PopularPage from './pages/PopularPage';
import SearchPage from './pages/SearchPage';
import StoreInformation from './pages/StoreInformation';
import StoreLoginPage from './pages/StoreLoginPage';



const router = createBrowserRouter([
  {
    path: "/book",
    element: <BookPage/>
  },
  {
    path: "/contactUs",
    element: <ContactUsPage/>
  },
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/memberLogin",
    element: <MemberLoginPage/>
  },
  {
    path: "/memberLogin/:id",
    element: <MemberLoginPage/>
  },
  {
    path: "/memberRegister",
    element: <MemberRegister/>
  },
  {
    path: "/payment",
    element: <PaymentPage/>
  },
  {
    path: "/popular",
    element: <PopularPage/>
  },
  {
    path: "/search",
    element: <SearchPage/>
  },
  {
    path: "/storeInformation",
    element: <StoreInformation/>
  },
  {
    path: "/storeLogin",
    element: <StoreLoginPage/>
  },
  {
    path: "/systemManage",
    element: <SystemManage/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
        
    </>
  )
}

export default App;
