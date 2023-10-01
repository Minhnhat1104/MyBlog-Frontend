import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from '~/tools/axios';

export const getImagesPage = async (pageParam = 1, options = {}) => {
  const res = await axios.get(`/v1/image?initial_num=9&per_page=3&page=${pageParam}`, options);
  return res.data;
};

const useImages = (pageNum = 1) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, sethasNextPage] = useState(false);

  const res = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/v1/image?initial_num=9&per_page=3&page=${pageNum}`);
      return res.data;
    },
    queryKey: ['images_list'],
  });

  return res;
};

export default useImages;
