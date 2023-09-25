import { Header } from '../Component';
import classNames from 'classnames/bind';
import style from './BackgroundLayout.module.scss';

const cx = classNames.bind(style);

function BackgroundLayout({ children }) {
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
