import React, { useState, useContext } from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const LoginPage = props => {
    const userCtx = useContext(UserContext);

    const [form, setForm] = useState({email: '', password: ''});

    const Login = () => {
        userCtx.loginUser(form.email, form.password);
    }
    const changeEmail = (e) => {
        const newEmail = e.target.value;
        setForm((formBefore) => ({
            email: newEmail, password: formBefore.password
        }));
    }

    const changePassword = (e) => {
        const newPass = e.target.value;
        setForm(formBefore => ({
            email: formBefore.email, password: newPass
        }))
    }

        return (
        <div className={css.Login}>
            {userCtx.state.userID && <Redirect to="/orders"/>}
            <input type="text" placeholder="Email Address" onChange={changeEmail} />
            <input type="password" placeholder="Password" onChange={changePassword}/>
            {userCtx.state.logginIn && <Spinner />}
            {userCtx.state.firebaseError && <div style={{color: 'red'}}>{userCtx.state.firebaseError}</div>}
            <Button text="Login" btnType="Success" clicked={Login} />
        </div>
        );
}

export default LoginPage;