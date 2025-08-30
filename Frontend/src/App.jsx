import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import { useAuthStore } from './store/useAuthStore.js'


const App = () => {
    const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
    console.log({onlineUsers})

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Checking session...</p>
      </div>
    );
  }
  return (
   <div>
     <Routes >
      <Route path="/" element={authUser? <Home/> : <Navigate to="/login" />}></Route>
      <Route path="/login" element={!authUser? <Login/> : <Navigate to="/" />}></Route>
      <Route path="/signup" element={!authUser? <Signup/> : <Navigate to="/" /> }></Route>
    </Routes>
    
   </div>
  
  )
}

export default App

