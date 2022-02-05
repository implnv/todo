import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import * as constantsAPI from '../constants/constsAPI';

class taskAPI {
    static getTasks = createAsyncThunk(
        'tasks/get', 
        async (author) => {
            let response = await axios({
                method: constantsAPI.TASKS.method,
                url: `${constantsAPI.TASKS.url + author}`
            });
            return response.data;
        }
    );
    static createTask = createAsyncThunk(
        'tasks/create',
        async ({ name, description, color, type, author }) => {
            let response = await axios({
                method: constantsAPI.TASKS_CREATE.method,
                url: constantsAPI.TASKS_CREATE.url,
                data: {
                    name,
                    description,
                    color,
                    type,
                    author
                }
            });
            return response.data;
        }
    );
    static move = createAsyncThunk(
        'tasks/move', 
        async ({uid, type}) => {
            let response = await axios({
                method: constantsAPI.TASK_MOVE.method,
                url: constantsAPI.TASK_MOVE.url,
                data: {
                    uid,
                    type
                }
            });
            return response.data;
        }
    );
}

export default taskAPI;