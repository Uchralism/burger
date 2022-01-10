import React, { useState } from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/SignupActions';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';

const SignupPage = props => {
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [error, setError] = useState();

    const Signup = () => {
        if(password1 === password2) {
            props.signupUser(email, password1);
        } else {
            setError('Passwords did not match!!!');
        }
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePassword1 = (event) => {
        setPassword1(event.target.value);
    }

    const changePassword2 = (event) => {
        setPassword2(event.target.value);
    }

        return (
        <div className={css.Signup}>
            {props.userID && <Redirect to="/"/>}
            <h1>Registration Form</h1>
            <div>Please fill your information</div>
            <input type="text" placeholder="Email Address" onChange={changeEmail}/>
            <input type="password" placeholder="Enter Password" onChange={changePassword1}/>
            <input type="password" placeholder="Enter Password Repeat" onChange={changePassword2}/>
            {props.firebaseError && <div style={{color: 'red'}}>{props.firebaseError}</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}
            {props.saving && <Spinner />}
            <Button text="Signup" btnType="Success" clicked={Signup} />
        </div>
        )
}

const mapStateToProps = state => {
    return {
        saving: state.SignupReducer.saving,
        firebaseError: state.SignupReducer.firebaseError,
        userID: state.SignupReducer.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (email, password) => dispatch(actions.signupUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)