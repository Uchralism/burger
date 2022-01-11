import React, { useState } from 'react';
import axios from '../axios-orders';

const BurgerContext = React.createContext();

export const BurgerStore = props => {
    const INGREDIENT_PRICES = {salad: 150, cheese: 250, bacon: 800, meat: 1500};

    const initialState = {
        ingredients : {
            salad : 0,
            cheese : 0,
            bacon : 0,
            meat : 0
        },
        totalPrice: 1000,
        purchasing: false,
        ingredientNames: {
            bacon: 'Гахайн мах',
            cheese: 'Бяслаг',
            meat: 'Үхрийн мах',
            salad: 'Салад'
        },
        saving: false,
        finished: false,
        error: null
    }

    const [burgerData, setBurgerData] = useState(initialState);

    const saveBurger = (OrderInfo, token) => {
            setBurgerData({ ...burgerData, saving: true});
            
            axios
                .post(`/orders.json?&auth=${token}`, OrderInfo)
                .then(response => {
                    setBurgerData({ ...burgerData, saving: false, finished: true, error: null});
                })
                .catch(error => {
                    setBurgerData({ ...burgerData, saving: false, finished: true, error});
                });
    };

    const toggle = () => {
        setBurgerData({ ...burgerData, saving: !burgerData.saving})
    }

    const clearBurger = () => {
        setBurgerData(initialState);
    }

    const addIngredient = (IngName) => {
        setBurgerData({
            ...burgerData, 
            ingredients: {
                ...burgerData.ingredients,
                [IngName]: burgerData.ingredients[IngName] + 1
            },
            totalPrice: burgerData.totalPrice + INGREDIENT_PRICES[IngName],
            purchasing: true
        });
    };

    const removeIngredient = (IngName) => {
        const newPrice = burgerData.totalPrice - INGREDIENT_PRICES[IngName];
        setBurgerData({
            ...burgerData, 
            ingredients: {
                ...burgerData.ingredients, 
                [IngName]: burgerData.ingredients[IngName] - 1
            },
            totalPrice: newPrice,
            purchasing: newPrice > 1000
        });
    }

    return (
        <BurgerContext.Provider value={{burgerData, addIngredient, removeIngredient, saveBurger, clearBurger, toggle}}>
            {props.children}
        </BurgerContext.Provider>
    )
}

export default BurgerContext;