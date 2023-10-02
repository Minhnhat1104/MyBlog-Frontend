import React, { lazy } from 'react';

import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/tools/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { LoadingButton } from '@mui/lab';

import useImages from '~/hooks/useImages';

const Image = lazy(() => import('~/components/Image'));
import Counter from '~/tools/countRender';
import { Grid } from '@mui/material';
import LoadingCircular from '~/components/LoadingCircular';

function Home() {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const [allImages, setAllImages] = useState([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const { data: results, isLoading, isFetching, isError, error } = useImages({ pageNum });

  const dispatch = useDispatch();
  const axoisJWT = createAxios(user, dispatch, loginSuccess);

  const handleDelete = useCallback(async (_id: string) => {
    const res = await axoisJWT.delete(`/v1/image/delete/${_id}`, {
      headers: {
        token: `BEARER ${user?.accessToken}`,
      },
    });
    alert(res.data);
    if (res.status === 200) setAllImages(allImages.filter((image: any) => image._id !== _id));
  }, []);

  if (isError) {
    console.log('🚀 ~ file: index.tsx:37 ~ error:', error);
    return <p>Error: </p>;
  }

  if (!user) {
    return <p>Please login first!</p>;
  }

  if (isLoading) {
    return <LoadingCircular />;
  }

  return (
    <>
      <Counter />
      <Grid container>
        {results?.map((singleData: any, i: number) => {
          return (
            <Grid item xs={12} md={4} key={singleData._id}>
              <React.Suspense fallback={<LoadingCircular />}>
                <Image user={user} handleDelete={handleDelete} singleData={singleData} />
              </React.Suspense>
            </Grid>
          );
        })}
      </Grid>

      <LoadingButton variant="contained" onClick={() => setPageNum(pageNum + 1)} loading={isFetching}>
        Load More
      </LoadingButton>
    </>
  );
}

export default Home;
