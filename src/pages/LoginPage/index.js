import React, { Component } from 'react';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/LoginActions';
import Spinner from '../../components/General/Spinner';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
    state = {
        email: '',
        password: ''
    };

    Login = () => {
        this.props.login(this.state.email, this.state.password);
    }
    changeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    changePassword = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
        return <div className={css.Login}>
            {this.props.userID && <Redirect to="/orders"/>}
            <input type="text" placeholder="Email Address" onChange={this.changeEmail} />
            <input type="password" placeholder="Password" onChange={this.changePassword}/>
            {this.props.logginIn && <Spinner />}
            {this.props.firebaseError && <div style={{color: 'red'}}>{this.props.firebaseError}</div>}
            <Button text="Login" btnType="Success" clicked={this.Login} />
        </div>;
    }
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