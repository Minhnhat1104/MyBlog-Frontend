import axios from '~/tools/axios';
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from '../redux/authSlice';

import { getImagesStart, getImagesSuccess, getImagesFailed } from '~/redux/imageSlice';
import { Axios } from 'axios';

export const loginUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('/v1/auth/login', user);
    console.log('🚀 ~ file: apiRequest.js:20 ~ res:', res);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(registerStart());
  try {
    await axios.post('/v1/auth/register', user);
    dispatch(registerSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const logoutUser = async (dispatch: any, id: string, navigate: any, accessToken: string, axoisJWT: Axios) => {
  dispatch(logoutStart());
  try {
    await axoisJWT.post('/v1/auth/logout', id, {
      headers: {
        token: `BEARER ${accessToken}`,
      },
    });
    dispatch(logoutSuccess());
    navigate('/login');
  } catch (err) {
    console.log(err);
    dispatch(logoutFailed());
  }
};

export const getAllImages = async (accessToken: string, dispatch: any, axoisJWT: Axios) => {
  dispatch(getImagesStart());
  try {
    const res = await axoisJWT.get('/v1/image', {
      headers: {
        token: `BEARER ${accessToken}`,
      },
    });
    dispatch(getImagesSuccess());
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(getImagesFailed());
  }
};
