import React, { useContext} from 'react';
import Button from '../General/Button';
import BurgerContext from '../../context/BurgerContext';

const OrderSummary = (props) => {
    const burgerContext = useContext(BurgerContext);
    return (
    <div>
        <h3>Order information</h3>
        <p>Your selected ingredients : </p>
        <ul>
            {Object.keys(burgerContext.burgerData.ingredients).map(el => (
                <li key={el}>{burgerContext.burgerData.ingredientNames[el]} : {burgerContext.burgerData.ingredients[el]}</li>
            ))}
        </ul>
        <p><strong>Total Order Amount : {burgerContext.burgerData.totalPrice}</strong></p>
        <p>Do you wanna continue???</p>
        <Button clicked={props.onCancel} text="Cancel" btnType="Danger"/>
        <Button clicked={props.onContinue} text="Accept" btnType="Success"/>
    </div>
    );
}

export default OrderSummary;