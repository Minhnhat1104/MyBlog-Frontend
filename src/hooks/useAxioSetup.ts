import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import axios from '~/tools/axios';
import jwt_decode from 'jwt-decode';

export const useAxioSetup = () => {
  const [user, setUser] = useRecoilState(userState);

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
};
