import { createAsyncThunk } from '@reduxjs/toolkit'
import * as constantsAPI from '../constants/constsAPI';
import request from './request';

class userAPI {
    static login = createAsyncThunk(
        'user/login',
        async ({ login, password }) => {
            let response = await request({
                method: constantsAPI.LOGIN.method,
                url: constantsAPI.LOGIN.url,
                data: {
                    login,
                    password
                }
            });
            return response.data;
        }
    );
    static registration = createAsyncThunk(
        'user/registration',
        async ({ name, login, password }) => {
            let response = await request({
                method: constantsAPI.REGISTRATION.method,
                url: constantsAPI.REGISTRATION.url,
                data: {
                    name,
                    login,
                    password
                }
            });
            return response.data;
        }
    );
    static refresh = createAsyncThunk(
        'user/refresh',
        async (token) => {
            let response = await request({
                method: constantsAPI.REFRESH.method,
                url: constantsAPI.REFRESH.url,
                data: {
                    token
                }
            });
            return response.data;
        }
    );
    static editProps = createAsyncThunk(
        'user/editProps',
        async ({ type, color, name, login }) => {
            let response = await request({
                method: constantsAPI.EDIT_PROPS.method,
                url: constantsAPI.EDIT_PROPS.url,
                data: {
                    login,
                    type,
                    color,
                    name
                }
            });
            return response.data;
        }
    );
}

export default userAPI;