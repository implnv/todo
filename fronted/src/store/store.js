import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../reducers/taskSlice';
import userSlice from '../reducers/userSlice';

const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;