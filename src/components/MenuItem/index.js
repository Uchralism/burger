import React from 'react';
import css from './style.module.css';
import { NavLink } from 'react-router-dom';

const MenuItem = (props) => {
    return <li className={css.MenuItem}>
        <NavLink exact={props.exact} activeClassName={css.active} to={props.link}>{props.children}</NavLink>
        {/* <a className={props.active ? css.active : null} href={props.link}>{props.children}</a> */}
    </li>
};

export default MenuItem;