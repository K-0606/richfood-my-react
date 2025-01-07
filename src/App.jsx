import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage'
import './App.css';
import Header from "./components/layout/Header"
import MemberRegister from './pages/MemberRegister';
import SystemManage from './pages/SystemManage';



function App() {
  return (
    <>
      <LoginPage/>
      <MemberRegister/>
      
     <SystemManage/>
    </>
  )
}

export default App;
