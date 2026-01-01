import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/base/hooks/useSnackbar';
import { queryKeys } from '~/config/queryKeys';

export const useAuthMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();

  const mRegisterUser = useMutation({
    mutationKey: [queryKeys.userRegister],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/register', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Register user successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Register user failed!');
    },
  });

  const mUserLogin = useMutation({
    mutationKey: [queryKeys.userLogin],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/login', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Login successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Login failed!');
    },
  });

  const mUserLogout = useMutation({
    mutationKey: [queryKeys.userLogout],
    mutationFn: async (params: any) => {
      const res = await axios.post('/v1/auth/logout', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Logout successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Logout failed!');
    },
  });

  return { mRegisterUser, mUserLogin, mUserLogout };
};
