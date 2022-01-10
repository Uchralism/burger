import React, { useEffect, useState, useContext } from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const SignupPage = props => {
    const userCtx = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setPassword2(email);
    }, [email]);

    const Signup = () => {
        if(password1 === password2) {
            userCtx.signupUser(email, password1);
        } else {
            setError('Passwords did not match!!!');
        }
    }

        return (
        <div className={css.Signup}>
            {userCtx.state.userID && <Redirect to="/"/>}
            <h1>Registration Form</h1>
            <div>Please fill your information</div>
            <input type="text" placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password" onChange={e => setPassword1(e.target.value)}/>
            <input type="password" placeholder="Enter Password Repeat" onChange={e => setPassword2(e.target.value)}/>
            {userCtx.state.firebaseError && <div style={{color: 'red'}}>{userCtx.state.firebaseError}</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}
            {userCtx.state.saving && <Spinner />}
            <Button text="Signup" btnType="Success" clicked={Signup} />
        </div>
        )
}

export default SignupPage;