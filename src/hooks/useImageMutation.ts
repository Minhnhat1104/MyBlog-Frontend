import axios from '~/tools/axios';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '~/base/hooks/useSnackbar';
import { queryKeys } from '~/config/queryKeys';

export const useImageMutation = () => {
  const { enqueueSuccess, enqueueError } = useSnackbar();
  const mUpload = useMutation({
    mutationKey: [queryKeys.imageUpload],
    mutationFn: async (params: any) => {
      const { imageFile, name, description, user } = params || {};
      for (let i = 0; i < imageFile?.length; i++) {
        const formData = new FormData();
        formData.append('file', imageFile?.[i]);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('username', user?.username);

        try {
          await axios.post('/v1/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (err) {
          alert(err);
          console.log(err);
        }
      }
    },
    onSuccess(data, variables, context) {
      enqueueSuccess('Update Images successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Update Images fail!');
    },
  });

  const mDelete = useMutation({
    mutationKey: [queryKeys.imageDelete],
    mutationFn: async (params: any) => {
      const res = await axios.delete('/v1/image/delete', params);

      return res;
    },
    onSuccess(data: any, variables, context) {
      enqueueSuccess('Delete image successfully!');
    },
    onError(data, variables, context) {
      enqueueError('Delete image failed!');
    },
  });

  return { mUpload, mDelete };
};
