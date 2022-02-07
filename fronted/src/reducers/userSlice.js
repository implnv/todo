import { createSlice } from "@reduxjs/toolkit";
import userAPI from '../api/userAPI';

const changeUserState = (state, payload) => {
    const { id, name, login, props } = payload.user;
    const { access, refresh } = payload.tokens;

    state.id = id;
    state.name = name;
    state.login = login;
    state.props = props;

    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh)
}

const clearUserState = (state) => {
    state.name = '';
    state.login = '';
    state.accessToken = '';

    localStorage.clear();
}

const initialState = {
    id: '',
    name: '',
    login: '',
    // accessToken: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => clearUserState(state)
    },
    extraReducers: {
        [userAPI.login.fulfilled]: (state, { payload }) => changeUserState(state, payload),
        [userAPI.registration.fulfilled]: (state, { payload }) => changeUserState(state, payload),
        [userAPI.refresh.fulfilled]: (state, { payload }) => changeUserState(state, payload),
        [userAPI.editProps.fulfilled]: (state, { payload }) => {
            state.props = payload.user.props;
        },
        [userAPI.init.fulfilled]: (state, { payload }) => {
            const { id, name, login, props } = payload.user;
            
            state.id = id;
            state.name = name;
            state.login = login;
            state.props = props;
        }
    }
});

export default userSlice;