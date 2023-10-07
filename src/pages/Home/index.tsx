import React, { lazy } from 'react';

import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/tools/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { LoadingButton } from '@mui/lab';

import useImages from '~/hooks/useImages';

const Image = lazy(() => import('~/components/Image'));
import Counter from '~/tools/countRender';
import { Box, CircularProgress, Grid } from '@mui/material';
import LoadingCircular from '~/components/LoadingCircular';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const [allImages, setAllImages] = useState([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const { data: results, isLoading, isFetching, error } = useImages({ pageNum });

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

  if (error) {
    console.log('Error:', error);
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
      {/* <Counter /> */}
      <InfiniteScroll
        dataLength={results?.length}
        next={() => {
          console.log(123456);

          return setPageNum((prev: number) => {
            console.log('pageNum', prev);

            return prev + 1;
          });
        }}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={true}
        scrollThreshold={0}
        loader={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}>
            <CircularProgress />
          </Box>
        }
        height={'100%'}
        hasChildren={results?.length}
      >
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
      </InfiniteScroll>
    </>
  );
}

export default Home;
