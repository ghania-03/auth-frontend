import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';

import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/signup" element = {<SignupPage/>} />
        <Route path="/login" element= {<LoginPage/>}/>
        <Route path="/forgot-password" element= {<ForgotPasswordPage/>}/>
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
