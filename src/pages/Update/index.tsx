import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '~/components/LoadingIcon';
import classNames from 'classnames/bind';
import style from './Update.module.scss';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { createAxios } from '~/tools/createInstance';
import React from 'react';

const cx = classNames.bind(style);

function Update() {
    const user = useSelector((state: any) => state.auth.login?.currentUser);
    const [showLoading, setShowLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<any>(null);
    const params = useParams();
    const dispatch = useDispatch();
    const axoisJWT = createAxios(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;

    useEffect(() => {
        const getImage = async () => {
            setShowLoading(true);
            const res = await axoisJWT.get(`/v1/image/${params._id}`, {
                headers: {
                    token: `BEARER ${accessToken}`,
                },
            });
            setImage(res.data);
            setShowLoading(false);
        };

        getImage();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name,
            description,
            author: user?.username,
        };

        try {
            const res = await axoisJWT.patch(`/v1/image/update/${params._id}`, body, {
                headers: {
                    token: `BEARER ${accessToken}`,
                },
            });
            alert(res.data);
        } catch (err) {
            alert(err);
        }
        e.target.reset();
    };

    let base64String = '';

    if (image) {
        base64String = btoa(
            new Uint8Array(image?.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''),
        );
    }

    return (
        <>
            {image ? (
                <div className={cx('wrapper')}>
                    <div className={cx('left')}>
                        <img className={cx('img')} src={`data:image/png;base64,${base64String}`} alt="" />
                    </div>

                    <section className={cx('container-right')}>
                        <div className={cx('title')}>Upload</div>
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <label className={cx('input-label')}>Picture's name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your picture's name"
                                className={cx('text-input')}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className={cx('input-label')}>Description</label>
                            <textarea
                                className={cx('description-input')}
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Enter your description"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></textarea>
                            <Button className={cx('submit-btn')} type="submit" primary>
                                Upload
                            </Button>
                        </form>
                    </section>
                </div>
            ) : (
                ''
            )}
            ;{showLoading && <LoadingIcon />}
        </>
    );
}

export default Update;
