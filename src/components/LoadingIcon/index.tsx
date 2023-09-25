import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './LoadingIcon.module.scss';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(style);

function LoadingIcon() {
    return <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner as IconProp} />;
}

export default LoadingIcon;
