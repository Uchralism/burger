import React, { useContext, useMemo } from 'react';
import BurgerIngredient from '../BurderIngredient';
import css from './style.module.css';
import BurgerContext from '../../context/BurgerContext';

const Burger = (props) => {
    const burgerContext = useContext(BurgerContext);

    const items = Object.entries(burgerContext.burgerData.ingredients);
    
    let content = [];

    items.map(el => {
        for(let i=0; i<el[1]; i++) {
        content.push(<BurgerIngredient key={`${el[0]}${i+1}}`} type={el[0]} />);
        }
    });

    if(content.length === 0) content = <p>Please select your Burger ingredients ...</p>

    return useMemo(() => {
        console.log("Burger rendered ....");
        return (
            <div className={css.Burger}>
                <BurgerIngredient type="bread-top"/>
                {content}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        );
    }, [burgerContext.burgerData.ingredients])
}

export default Burger;