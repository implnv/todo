import { createAsyncThunk } from '@reduxjs/toolkit'
import * as constantsAPI from '../constants/constsAPI';
import request from './request';
class taskAPI {
    static getTasks = createAsyncThunk(
        'tasks/get', 
        async () => {
            let response = await request({
                method: constantsAPI.TASKS.method,
                url: constantsAPI.TASKS.url
            });
            return response.data;
        }
    );
    static createTask = createAsyncThunk(
        'tasks/create',
        async ({ name, description, color, type }) => {
            let response = await request({
                method: constantsAPI.TASK_CREATE.method,
                url: constantsAPI.TASK_CREATE.url,
                data: {
                    name,
                    description,
                    color,
                    type
                }
            });
            return response.data;
        }
    );
    static editTask = createAsyncThunk(
        'task/edit',
        async ({ name, description, _id }) => {
            let response = await request({
                method: constantsAPI.TASK_EDIT.method,
                url: constantsAPI.TASK_EDIT.url,
                data: {
                    name,
                    description,
                    id: _id
                }
            });
            return response.data;
        }
    );
    static deleteTask = createAsyncThunk(
        'task/delete',
        async (id) => {
            let response = await request({
                method: constantsAPI.TASK_DELETE.method,
                url: constantsAPI.TASK_DELETE.url,
                data: {
                    id
                }
            });
            return response.data;
        }
    );
    static moveTask = createAsyncThunk(
        'tasks/move', 
        async ({ id, type }) => {
            let response = await request({
                method: constantsAPI.TASK_MOVE.method,
                url: constantsAPI.TASK_MOVE.url,
                data: {
                    id,
                    type
                }
            });
            return response.data;
        }
    );
}

export default taskAPI;