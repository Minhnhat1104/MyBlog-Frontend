import { useState, useEffect } from 'react';
import axios from '~/tools/axios';

export const getImagesPage = async (pageParam = 1, options = {}) => {
    const res = await axios.get(`/v1/image?initial_num=9&per_page=3&page=${pageParam}`, options);
    return res.data;
};

const useImages = (pageNum = 1) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, sethasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const { signal } = controller;

        getImagesPage(pageNum, { signal })
            .then((data) => {
                if (data.length === 0) {
                    setIsLoading(false);
                    if (signal.aborted) return;
                    setIsError(true);
                    setError({ message: 'Out of photos' });
                }
                setResults((prev) => [...prev, ...data]);
                sethasNextPage(true);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                if (signal.aborted) return;
                setIsError(true);
                setError({ message: e.message });
            });
        return () => controller.abort();
    }, [pageNum]);

    return { results, isLoading, isError, error, hasNextPage };
};

export default useImages;
