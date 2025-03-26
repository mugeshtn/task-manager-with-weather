import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'
import { useSelector } from 'react-redux'

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App