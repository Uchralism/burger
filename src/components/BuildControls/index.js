import React, { useContext } from "react";
import BuildControl from '../BuildControl';
import css from './style.module.css';
import BurgerContext from "../../context/BurgerContext";


const BuildControls = (props) => {
    const burgerContext = useContext(BurgerContext);
    const disabledIngredients = {...burgerContext.burgerData.ingredients};
        for(let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0;
        } 

    return (
        <div className={css.BuildControls}>
            <p>Burger total price : <strong>{burgerContext.burgerData.totalPrice}</strong></p>

            {
                Object.keys(burgerContext.burgerData.ingredientNames).map(el => (
                    <BuildControl 
                        key={el}
                        disabled={disabledIngredients} 
                        type = {el} 
                        orts = {burgerContext.burgerData.ingredientNames[el]}
                    />
                ))
            }
            <button onClick={props.showConfirmModal} disabled={!burgerContext.burgerData.purchasing} className={css.OrderButton}>Order</button>
            </div>
    )
}

export default BuildControls;