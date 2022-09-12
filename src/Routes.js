import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from "./auth/PrivateRoute";


import Home from './pages/Home';
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Pos from "./POS/Pos";
import Profile from "./pages/Profile";
import { useAuth } from './contexts/AuthContext';
import AddProducts from './components/AddProducts';


const RoutesComponent = () => {
    return (
        <Routes>

            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path="pos" element={<Pos />} />
                <Route path="addProducts" element={<AddProducts />} />
                <Route path={`your-profile`} element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default RoutesComponent