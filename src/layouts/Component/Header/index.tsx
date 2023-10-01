import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/tools/createInstance';
import { logoutUser } from '~/tools/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import Logo from '~/assets/img/logo';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(style);

function Header() {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleLogout = () => {
    logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('right-container')}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {user ? (
          <div className={cx('left-container')}>
            <Button large iconOnly outline to="/upload">
              <FontAwesomeIcon icon={faUpload as IconProp} />
            </Button>
            <Button large iconOnly outline to="/">
              <FontAwesomeIcon icon={faImage as IconProp} />
            </Button>
            <Button large disabled>
              {user.username}
            </Button>
            <Button large primary onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className={cx('left-container')}>
            <Button primary to="/login">
              Login
            </Button>
            <Button outline to="/Register">
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
