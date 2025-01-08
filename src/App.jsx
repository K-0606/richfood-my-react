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
    path: "/memberLoginPage",
    element: <MemberLoginPage/>
  },
  {
    path: "/memberRegister",
    element: <MemberRegister/>
  },
  {
    path: "/paymentPage",
    element: <PaymentPage/>
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
