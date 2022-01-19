import React from 'react';
import Login from './Login';
import Home from './Home';
import Signup from './Sign-up';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function RouteConfig() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteConfig;