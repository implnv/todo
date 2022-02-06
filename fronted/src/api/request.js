import axios from "axios";
import { BASE_URL } from "../constants/constsAPI";

const request = axios.create({
    baseURL: BASE_URL
});

request.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
});

export default request;