import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Update.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { createAxios } from '~/tools/createInstance';
import React from 'react';
import LoadingCircular from '~/components/LoadingCircular';
import { useImage } from '~/hooks/useImages';

const cx = classNames.bind(style);

function Update() {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { _id } = useParams();
  const dispatch = useDispatch();

  const { data } = useImage({ id: _id || '' });

  const image = data || null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const body = {
    //   name,
    //   description,
    //   author: user?.username,
    // };

    // try {
    //   const res = await axoisJWT.patch(`/v1/image/update/${_id}`, body, {
    //     headers: {
    //       token: `BEARER ${accessToken}`,
    //     },
    //   });
    //   alert(res.data);
    // } catch (err) {
    //   alert(err);
    // }
    e.target.reset();
  };

  let base64String = '';

  if (image) {
    base64String = btoa(
      new Uint8Array(image?.image.data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, '')
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
      ;{showLoading && <LoadingCircular />}
    </>
  );
}

export default Update;
