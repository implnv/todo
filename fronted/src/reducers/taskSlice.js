import { createSlice } from '@reduxjs/toolkit';
import taskAPI from '../api/taskAPI';

const initialState = {
    tasks: null,
    refreshNeeded: false
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toogleRefresh: (state) => {
            state.refreshNeeded = !state.refreshNeeded;
        }
    },
    extraReducers: {
        [taskAPI.getTasks.fulfilled]: (state, { payload }) => {
            state.tasks = payload.tasks;
        },
        [taskAPI.createTask.fulfilled]: (state, { payload }) => {
            state.tasks.push(payload.task);
        },
        [taskAPI.editTask.fulfilled]: (state, { payload }) => {
            state.tasks.forEach(element => {
                if (element._id === payload.task._id) {
                    element.name = payload.task.name;
                    element.description = payload.task.description;
                }
            })
        },
        [taskAPI.deleteTask.fulfilled]: (state, { payload }) => {
            state.tasks = state.tasks.filter(element => element._id != payload.task._id);
        },
        [taskAPI.move.fulfilled]: (state, { payload }) => {
            state.tasks.forEach(element => {
                if (element._id === payload.task._id) {
                    element.type = payload.task.type;
                }
            });
        }
    }
});

export default taskSlice;