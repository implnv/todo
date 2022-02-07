import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import Header from './Header';
import Tasks from './Tasks';
import userAPI from "../api/userAPI";

const Home = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return <Navigate to='login' /> 

    const dispatch = useDispatch();
    dispatch(userAPI.init());

    return (
        <div className="m-3 overflow-hidden">
            <Header />
            <Tasks />
        </div>
    );
};

export default Home;