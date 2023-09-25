import Header from '../Component/Header';
import classNames from 'classnames/bind';
import style from './BackgroundLayout.module.scss';
import React from 'react';

const cx = classNames.bind(style);

function BackgroundLayout({ children }: any) {
    return (
        <>
            <div className={cx('app-container')}></div>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </>
    );
}

export default BackgroundLayout;
