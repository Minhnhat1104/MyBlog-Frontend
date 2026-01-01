import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { queryKeys } from '~/config/queryKeys';
import axios from '~/tools/axios';

export const getImagesPage = async (pageParam = 1, options = {}) => {
  const res = await axios.get(`/v1/image?initial_num=9&per_page=3&page=${pageParam}`, options);
  return res.data;
};

const useImages = (params: { page: number; size: number }) => {
  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/image`, { params });
      return res.data;
    },

    queryKey: [queryKeys.imageList, params?.page, params?.size],
    keepPreviousData: true,
  });

  return res;
};

export default useImages;
