import * as types from '../actionTypes';
import Axios from 'axios';
import { login, signup, me } from '../../utils/endpoints';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const startAuth = () => {
  return {
    type: types.AUTH_START,
  };
};

const successAuth = (token: string, user: any) => {
  return {
    type: types.AUTH_SUCCESS,
    token,
    user,
  };
};

const failAuth = (error: any) => {
  return {
    type: types.AUTH_FAIL,
    error,
  };
};

export const loginUser = (email: String, password: String) => async (
  dispatch: Function
) => {
  try {
    dispatch(startAuth());

    const { data } = await Axios.post(login, { email, password }, config);
    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(successAuth(token, user));
  } catch (err) {
    dispatch(failAuth(err.response?.data.error));
  }
};

export const signupUser = (
  email: String,
  username: String,
  password: String,
  passwordConfirm: String,
  role: String
) => async (dispatch: Function) => {
  try {
    dispatch(startAuth());

    const { data } = await Axios.post(signup, {
      email,
      username,
      password,
      passwordConfirm,
      role,
    });
    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(successAuth(token, user));
  } catch (err) {
    dispatch(failAuth(err.response?.data.error));
  }
};

export const logout = () => async (dispatch: Function) => {
  try {
    dispatch(startAuth());

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (err) {
    dispatch(failAuth(err.response?.data.error));
  }
};

export const authCheckState = () => async (dispatch: Function) => {
  const token = localStorage.getItem('token') as string;
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (!token && !user) {
    dispatch(logout());
  } else {
    dispatch(successAuth(token, user));
  }
};

export const updateUser = (user: any) => async (dispatch: Function) => {
  dispatch(startAuth());
  const token = localStorage.getItem('token') as string;
  localStorage.setItem("user",JSON.stringify(user));
  dispatch(successAuth(token, user));
};
