import React from 'react';

import BurgerIngredient from '../BurderIngredient';

import css from './style.module.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Burger = (props) => {

    const items = Object.entries(props.orts);
    
    let content = [];

    items.map(el => {
        for(let i=0; i<el[1]; i++) {
        content.push(<BurgerIngredient key={`${el[0]}${i+1}}`} type={el[0]} />);
        }
    });

    if(content.length === 0) content = <p>Hachirtai talhniihaa ortsiig songono uu...</p>

    return (
        <div className={css.Burger}>
            <BurgerIngredient type="bread-top"/>
            {content}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orts: state.BurgerReducer.ingredients
    }
}

export default connect(mapStateToProps)(withRouter(Burger));