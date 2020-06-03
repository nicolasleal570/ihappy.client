import * as types from '../actionTypes';
import Axios from 'axios';
import { login } from '../../utils/endpoints'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const startAuth = () => {
    return {
        type: types.AUTH_START
    };
};

const successAuth = (token: string, user: any) => {
    return {
        type: types.AUTH_SUCCESS,
        token,
        user
    }
}

const failAuth = (error: any) => {
    return {
        type: types.AUTH_FAIL,
        error
    }
}

export const loginUser = (email: String, password: String) => async (dispatch: Function) => {
    try {
        dispatch(startAuth());

        const { data } = await Axios.post(login, { email, password }, config);
        const { token, user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(successAuth(token, user));

    } catch (err) {
        dispatch(failAuth(err.response?.data.error));
    }
};

export const logout = () => async (dispatch: Function) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: types.AUTH_LOGOUT
    };
}

export const authCheckState = () => async (dispatch: Function) => {
    const token = localStorage.getItem("token") + '';
    const user = JSON.parse(localStorage.getItem("user") + '');
    if (token === undefined) {
        dispatch(logout());
    } else {
        dispatch(successAuth(token, user));
    }
}

export const updateUser = (user:any) => async (dispatch: Function) => {
    const token = localStorage.getItem('token') + '';
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(successAuth(token,user));
}
