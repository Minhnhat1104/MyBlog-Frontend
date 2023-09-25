import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import Button from '~/components/Button';
import { registerUser } from '~/tools/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const cx = classNames.bind(style);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email,
            username,
            password,
        };
        await registerUser(user, dispatch, navigate);
        alert('Register success');
    };
    return (
        <section className={cx('container')}>
            <div className={cx('container-left')}>
                <span className={cx('logo')}>Lmn</span>
            </div>
            <div className={cx('container-right')}>
                <div className={cx('title')}>Register</div>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <label className={cx('input-label')}>Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        className={cx('input')}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className={cx('input-label')}>username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className={cx('input')}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className={cx('input-label')}>password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className={cx('input')}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className={cx('submit-btn')} type="submit" primary>
                        Create account
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Register;
