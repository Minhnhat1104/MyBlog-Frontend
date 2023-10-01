import axios from 'axios';
import jwt_decode from 'jwt-decode';

const refreshToken = async () => {
  try {
    const res = await axios.post('/v1/auth/refresh', {
      // yeu cau co cookie thi gan vao
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createAxios = (user: any, dispatch: any, stateSuccess: any) => {
  const newInstance = axios.create();

  newInstance.interceptors.request.use(
    async (config: any) => {
      const date = new Date();
      const decodedToken: any = jwt_decode(user?.accessToken);
      if (decodedToken?.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = { ...user, accessToken: data.accessToken };
        dispatch(stateSuccess(refreshUser));
        config.headers['token'] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

export { createAxios };
