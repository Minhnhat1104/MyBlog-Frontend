import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { queryKeys } from '~/base/config/queryKeys';
import axios from '~/tools/axios';

export const getImagesPage = async (pageParam = 1, options = {}) => {
  const res = await axios.get(`/v1/image?initial_num=9&per_page=3&page=${pageParam}`, options);
  return res.data;
};

const useImages = (params: any) => {
  const initial_num = 9;
  const per_page = 3;
  const res = useQuery({
    queryFn: async ({ queryKey }: any) => {
      const pageNum = queryKey?.[1];
      const res = await axios.get(`/v1/image?initial_num=${initial_num}&per_page=${per_page}&page=${pageNum}`);
      return res.data;
    },

    queryKey: [queryKeys.imageList, params?.pageNum],
    keepPreviousData: true,
    enabled: !!params?.pageNum || params?.pageNum === 0,
  });

  return res;
};

export default useImages;
