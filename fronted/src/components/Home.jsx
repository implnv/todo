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

    useEffect(() => {
        dispatch(userAPI.refresh(token));
    }, [dispatch, token]);

    return (
        <div className="mt-3 ms-5 me-5">
            <Header />
            <Tasks />
        </div>
    );
};

export default Home;