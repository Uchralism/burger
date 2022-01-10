import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/LoginActions';
import { Redirect } from 'react-router-dom';

const Logout = props => {

    useEffect(() => {
        props.logout();
    }, []);

    return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.LogOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);