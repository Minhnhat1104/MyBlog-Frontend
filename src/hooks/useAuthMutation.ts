import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/base/hooks/useSnackbar';

export const useAuthMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();

  const mRegisterUser = useMutation({
    mutationKey: [],
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

  return { mRegisterUser };
};
