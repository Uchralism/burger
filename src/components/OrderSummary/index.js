import React from 'react';
import Button from '../General/Button';
import { connect } from 'react-redux';

const OrderSummary = (props) => {
    return (
    <div>
        <h3>Tanii zahialga</h3>
        <p>Tanii songoson ortsuud : </p>
        <ul>
            {Object.keys(props.ingredients).map(el => (
                <li key={el}>{props.ingredientNames[el]} : {props.ingredients[el]}</li>
            ))}
        </ul>
        <p><strong>Total Order Amount : {props.price}</strong></p>
        <p>Do you wanna continue???</p>
        <Button clicked={props.onCancel} text="Cancel" btnType="Danger"/>
        <Button clicked={props.onContinue} text="Accept" btnType="Success"/>
    </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients : state.BurgerReducer.ingredients,
        ingredientNames : state.BurgerReducer.ingredientNames,
        price : state.BurgerReducer.totalPrice
    }
}

export default connect(mapStateToProps)(OrderSummary);