import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../General/Button';
import css from './style.module.css';
import Spinner from '../General/Spinner';
import BurgerContext from '../../context/BurgerContext';
import UserContext from '../../context/UserContext';

const ContactData  = props => {
    const ctx = useContext(BurgerContext);
    const userCtx = useContext(UserContext);
    const history = useHistory();

    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    
    const dunRef = useRef();

    useEffect(() => {
        if(ctx.burgerData.finished && !ctx.burgerData.error) {
        history.push("/orders");
        }

        return () => {
            ctx.clearBurger();
        }
    }, [ctx.burgerData.finished]);

    const changeName = (e) => {
        if(dunRef.current.style.color === 'red')
            dunRef.current.style.color = 'green';
        else
            dunRef.current.style.color = 'red';
        setName(e.target.value);
    };
    const changeStreet = (e) => {
        setStreet(e.target.value);
    };
    const changeCity = (e) => {
        setCity(e.target.value);
    };

    const saveOrder = () => {
        const order = {
            userID: userCtx.state.userID,
            orts: ctx.burgerData.ingredients,
            dun: ctx.burgerData.totalPrice,
            order_address: {
                name,
                city,
                street
            }
        };

        ctx.saveBurger(order, userCtx.state.token);
    }
    console.log("ContactData rendered ....");
        return (
        <div className={css.ContactData}>
            <div ref={dunRef}>
                <strong style={{fontSize: "16px"}}>Дүн : {ctx.burgerData.totalPrice}₮</strong>
            </div>
            <div>
                {ctx.burgerData.error && `Order Has Been Errorred : ${ctx.burgerData.error}`}
            </div>
            {ctx.burgerData.saving ? <Spinner /> : (<div><input onChange={changeName} type="text" name='name' placeholder='Your Name' />
            <input onChange={changeStreet} type="text" name='street' placeholder='Your Address' />
            <input onChange={changeCity} type="text" name='city' placeholder='Your City' />
            <Button text="Order Send" btnType='Success' clicked={saveOrder} /></div>)}
            <Button text="Toggle" btnType='Success' clicked={ctx.toggle} />
        </div>
        )
}

export default ContactData;