import React from 'react'
import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from "./auth/PrivateRoute";


import Home from './pages/Home';
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import AddProducts from './components/AddProducts';
import PosContainer from './POS/PosContainer';
import ChooseUser from './POS/ChooseUser';


const RoutesComponent = () => {
    return (
        <Routes>

            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path="pos" element={<PosContainer />} />
                <Route path="addProducts" element={<AddProducts />} />
                <Route path={`your-profile`} element={<Profile />} />
                <Route path={`select-a-user`} element={<ChooseUser />} />

            </Route>
        </Routes>
    )
}

export default RoutesComponent