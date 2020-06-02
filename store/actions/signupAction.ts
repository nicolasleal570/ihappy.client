import * as types from '../actionTypes';
import Axios from 'axios';
import { signup } from '../../utils/endpoints'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const startSignup = () => {
    return {
        type: types.SIGNUP_START
    };
};

const successSignup = (token: string, user: any) => {
    return {
        type: types.SIGNUP_SUCCESS,
        token,
        user
    }
}

const failSignup = (error: any) => {
    return {
        type: types.SIGNUP_FAIL,
        error
    }
}

export const signupUser = (email: String, username: String,password: String,passwordConfirm: String ,role: String) => async (dispatch: Function) => {
    try {
        dispatch(startSignup());

        const { data } = await Axios.post(signup, {email, username,password,passwordConfirm ,role });
        const { token, user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(successSignup(token, user));

    } catch (err) {
        dispatch(failSignup(err.response?.data.error));
    }
};


