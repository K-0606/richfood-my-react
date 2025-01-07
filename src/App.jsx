import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage'
import './App.css';
import Header from "./components/layout/Header"



function App() {
  return (
    <>
      <h1>Hello RichFood</h1>
      <LoginPage/>
      <Header/>
    </>
  )
}


