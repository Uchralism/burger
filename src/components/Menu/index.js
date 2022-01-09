import React, { Fragment } from 'react';
import css from './style.module.css';
import MenuItem from '../MenuItem';
import { connect } from 'react-redux';

const Menu = (props) => (
    <div>
        <ul className={css.Menu}>
            {props.userID ? 
            <Fragment>
                <MenuItem exact link="/">New Order</MenuItem>
                <MenuItem link="/orders">Orders</MenuItem>
                <MenuItem link="/logout">Logout</MenuItem>   
            </Fragment>
                : 
            <Fragment>
                <MenuItem link="/login">Login</MenuItem>
                <MenuItem link="/signup">Signup</MenuItem>
            </Fragment>
            }
        </ul>
    </div>
)

const mapStateToProps = state => {
    return {
        userID: state.SignupReducer.userID
    }
}

export default connect(mapStateToProps)(Menu);