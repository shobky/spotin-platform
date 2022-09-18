import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import AddProducts from './components/AddProducts';
import PosContainer from './POS/PosContainer';
import ChooseUser from './POS/selectUsers/ChooseUser';
// import UserRoute from './auth/UserRoute';
import AdminRoute from './auth/AdminRoute'
import Orders from './POS/orders/Orders';


const RoutesComponent = () => {
    return (
        <Routes>

            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AdminRoute />}>
                <Route path="pos" element={<PosContainer />} />
                <Route path="addProducts" element={<AddProducts />} />
                <Route path={`your-profile`} element={<Profile />} />
                <Route path={`select-a-user`} element={<ChooseUser />} />
                <Route path={`pos/open-orders`} element={<Orders />} />
            </Route>
        </Routes>
    )
}

export default RoutesComponent