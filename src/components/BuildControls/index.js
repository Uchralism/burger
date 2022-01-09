import React from "react";
import BuildControl from '../BuildControl';
import css from './style.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/BurgerActions';

const BuildControls = (props) => {

    const disabledIngredients = {...props.ingredients};
        for(let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0;
        } 

    return (
        <div className={css.BuildControls}>
            <p>Burgeriin vne : <strong>{props.price}</strong></p>

            {
                Object.keys(props.ingredientNames).map(el => (
                    <BuildControl 
                        key={el}
                        ortsHasah={props.IngRemove} 
                        ortsNemeh={props.IngAdd} 
                        disabled={disabledIngredients} 
                        type = {el} 
                        orts = {props.ingredientNames[el]}
                    />
                ))
            }
            <button onClick={props.showConfirmModal} disabled={!props.disabled} className={css.OrderButton}>Order</button>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        price: state.BurgerReducer.totalPrice,
        ingredientNames: state.BurgerReducer.ingredientNames,
        ingredients: state.BurgerReducer.ingredients,
        disabled: state.BurgerReducer.purchasing
    }
};

const mapDispatchToProps = dispatch => {
    return {
        IngAdd: IngName => dispatch(actions.addIngredient(IngName)),
        IngRemove: IngName => dispatch(actions.removeIngredient(IngName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);