import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import axios from '~/tools/axios';
import jwt_decode from 'jwt-decode';
import { useSnackbar } from '~/base/hooks/useSnackbar';
import { Outlet, useNavigate } from 'react-router-dom';

interface AxiosContextProps {}

const AxiosContext = ({}: AxiosContextProps) => {
  const [user, setUser] = useRecoilState(userState);
  const { enqueueError } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => {
        if (res?.status === 401) {
          enqueueError('Your login session is expried!');
          navigate('/login');
        }
        return res?.data;
      },
      (err) => {
        return Promise.reject(err?.response?.data);
      }
    );

    return () => {
      axios.interceptors.response.eject(id);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const id = axios.interceptors.request.use(
        async (config: any) => {
          const date = new Date();
          const decodedToken: any = jwt_decode(user?.accessToken);
          if (decodedToken?.exp < date.getTime() / 1000) {
            const res = await axios.post('/v1/auth/refresh', {
              // yeu cau co cookie thi gan vao
              withCredentials: true,
            });

            const newUser = { ...user, accessToken: res?.data?.accessToken || '' };

            setUser(newUser);
            config.headers['token'] = `Bearer ${res?.data?.accessToken}`;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

      return () => {
        axios.interceptors.request.eject(id);
      };
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AxiosContext;
