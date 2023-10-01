import Header from '../Component/Header';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
import React from 'react';

const cx = classNames.bind(style);

function DefaultLayout({ children }: any) {
  return (
    <>
      <Header />
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
