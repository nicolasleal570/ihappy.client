import * as types from '../actionTypes';
import Axios, { AxiosRequestConfig } from 'axios';
import { login, signup, me, logout } from '../../utils/endpoints';
import Cookies from 'js-cookie';

const config: AxiosRequestConfig = {
  withCredentials: true,
};

const startAuth = () => {
  return {
    type: types.AUTH_START,
  };
};

const successAuth = (user: any) => {
  return {
    type: types.AUTH_SUCCESS,
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
    const { user, token } = data;
    // Cookies.set('token', token);

    dispatch(successAuth(user));
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

    const { data } = await Axios.post(
      signup,
      {
        email,
        username,
        password,
        passwordConfirm,
        role,
      },
      config
    );
    const { user, token } = data;
    // Cookies.set('token', token);
    dispatch(successAuth(user));
  } catch (err) {
    dispatch(failAuth(err.response?.data.error));
  }
};

export const logoutAuth = () => async (dispatch: Function) => {
  try {
    dispatch(startAuth());

    const res = await Axios.put(logout, {}, config);
    const { success } = res.data;

    // if (success) {
    //   Cookies.remove('token');
    // }

    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (err) {
    dispatch(failAuth(err.response?.data.error));
  }
};

export const authCheckState = () => async (dispatch: Function) => {
  const { data } = await Axios.get(me, config);
  const user = data.data;
  if (!user) {
    dispatch(logoutAuth());
  } else {
    dispatch(successAuth(user));
  }
};

export const updateUser = (user: any) => async (dispatch: Function) => {
  dispatch(startAuth());
  dispatch(successAuth(user));
};
