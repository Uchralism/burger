import React, { useState } from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/LoginActions';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';

const LoginPage = props => {
    const [form, setForm] = useState({email: '', password: ''});

    const Login = () => {
        props.login(form.email, form.password);
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
            {props.userID && <Redirect to="/orders"/>}
            <input type="text" placeholder="Email Address" onChange={changeEmail} />
            <input type="password" placeholder="Password" onChange={changePassword}/>
            {props.logginIn && <Spinner />}
            {props.firebaseError && <div style={{color: 'red'}}>{props.firebaseError}</div>}
            <Button text="Login" btnType="Success" clicked={Login} />
        </div>
        );
}

const mapStateToProps = state => {
    return {
        logginIn: state.SignupReducer.logginIn,
        firebaseError: state.SignupReducer.firebaseError,
        userID: state.SignupReducer.userID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(actions.LoginUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)