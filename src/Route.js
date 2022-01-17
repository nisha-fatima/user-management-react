import React from 'react';
import Login from './Login';
import Home from './Home';
import Signup from './Sign-up';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function RouteConfig() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteConfig;