import React, { Component } from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/SignupActions';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';

class SignupPage extends Component {
    state = {
        email: '',
        password1: '',
        password2: '',
        error: null
    };

    Signup = () => {
        if(this.state.password1 === this.state.password2) {
            this.props.signupUser(this.state.email, this.state.password1);
        } else {
            this.setState({error: 'Passwords did not match!!!'})
        }
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    changePassword1 = (e) => {
        this.setState({password1: e.target.value});
    }

    changePassword2 = (e) => {
        this.setState({password2: e.target.value});
    }

    render() {
        return <div className={css.Signup}>
            {this.props.userID && <Redirect to="/"/>}
            <h1>Registration Form</h1>
            <div>Please fill your information</div>
            <input type="text" placeholder="Email Address" onChange={this.changeEmail}/>
            <input type="password" placeholder="Enter Password" onChange={this.changePassword1}/>
            <input type="password" placeholder="Enter Password Repeat" onChange={this.changePassword2}/>
            {this.props.firebaseError && <div style={{color: 'red'}}>{this.props.firebaseError}</div>}
            {this.props.saving && <Spinner />}
            <Button text="Signup" btnType="Success" clicked={this.Signup} />
        </div>;
    }
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