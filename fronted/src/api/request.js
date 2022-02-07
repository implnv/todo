import axios from "axios";
import { BASE_URL, REFRESH } from "../constants/constsAPI";

const request = axios.create({
    baseURL: BASE_URL
});

request.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
});

request.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const previousRequest = error.config;

    if (error.response.status === 500 && error.response.data.message === 'Верификация не пройдена, токен невалиден') {
        const response = await axios({
            url: BASE_URL + REFRESH.url,
            method: REFRESH.method,
            data: {
                token: localStorage.getItem('refreshToken')
            }
        });

        localStorage.setItem('accessToken', response.data.tokens.access);
        localStorage.setItem('refreshToken', response.data.tokens.refresh);

        return request.request(previousRequest);
    }
});

export default request;