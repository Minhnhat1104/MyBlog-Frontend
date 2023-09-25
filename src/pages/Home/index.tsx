import classNames from 'classnames/bind';
import style from './Home.module.scss';

import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/tools/createInstance';
import { loginSuccess } from '~/redux/authSlice';

import useImages from '~/hooks/useImages';

import LoadingIcon from '~/components/LoadingIcon';
import Image from '~/components/Image';
import Counter from '~/tools/countRender';
import React from 'react';
const cx = classNames.bind(style);

function Home() {
    const user = useSelector((state: any) => state.auth.login?.currentUser);
    const [allImages, setAllImages] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const { results, isLoading, isError, error, hasNextPage } = useImages(pageNum);

    const dispatch = useDispatch();
    const axoisJWT = createAxios(user, dispatch, loginSuccess);

    const intObserver = useRef<IntersectionObserver>();
    const lastImageRef = useCallback(
        (image) => {
            if (isLoading) return;

            if (intObserver.current) intObserver.current.disconnect();

            intObserver.current = new IntersectionObserver((images) => {
                if (images[0].isIntersecting && hasNextPage) {
                    console.log('We are near the last image!');
                    setPageNum((prev) => prev + 1);
                }
            });

            if (image) intObserver.current.observe(image);
        },
        [isLoading, hasNextPage],
    );

    const handleDelete = useCallback(async (_id) => {
        const res = await axoisJWT.delete(`/v1/image/delete/${_id}`, {
            headers: {
                token: `BEARER ${user?.accessToken}`,
            },
        });
        alert(res.data);
        if (res.status === 200) setAllImages(allImages.filter((image) => image._id !== _id));
    }, []);

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    if (!user) {
        return <p>Please login first!</p>;
    }

    const content = results.map((singleData, i) => {
        if (results.length === i + 1) {
            return (
                <div key={singleData._id} className={cx('col-4')}>
                    <Image ref={lastImageRef} user={user} handleDelete={handleDelete} singleData={singleData} />
                </div>
            );
        }
        return (
            <div key={singleData._id} className={cx('col-4')}>
                <Image user={user} handleDelete={handleDelete} singleData={singleData} />;
            </div>
        );
    });

    return (
        <>
            <Counter />
            <h2>{`page: ${pageNum}`}</h2>
            <div className={cx('wrapper')}>{content}</div>
            {/* {isLoading && <LoadingIcon />} */}
            {isLoading && <p>Loading...</p>}
            <p className="center">
                <a href="#top">Back to Top</a>
            </p>
        </>
    );
}

export default Home;
