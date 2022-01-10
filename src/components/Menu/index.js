import React, { useContext } from 'react';
import css from './style.module.css';
import MenuItem from '../MenuItem';
import UserContext from '../../context/UserContext';

const Menu = (props) => {
    const userCtx = useContext(UserContext);
    return (
    <div>
        <ul className={css.Menu}>
            {userCtx.state.userID ? 
            <>
                <MenuItem exact link="/">New Order</MenuItem>
                <MenuItem link="/orders">Orders</MenuItem>
                <MenuItem link="/logout">Logout</MenuItem>   
            </>
                : 
            <>
                <MenuItem link="/login">Login</MenuItem>
                <MenuItem link="/signup">Signup</MenuItem>
            </>
            }
        </ul>
    </div>
        )
    }

export default Menu;