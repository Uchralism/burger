import React, { useState, useEffect } from 'react';
import Button from '../General/Button';
import css from './style.module.css';
import Spinner from '../General/Spinner';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/OrderActions';
const ContactData  = props => {
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();    

    useEffect(() => {
        if(props.newOrderStatus.finished && !props.newOrderStatus.error) {
        props.history.push("/orders");
        }

        return () => {
            console.log('cleariin.....');
            props.clearOrder();
        }
    }, [props.newOrderStatus.finished]);

    const changeName = (e) => {
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
            userID: props.userID,
            orts: props.ingredients,
            dun: props.price,
            order_address: {
                name,
                city,
                street
            }
        };

        props.SaveOrderAction(order);
    }

        return (
        <div className={css.ContactData}>
            <div>
                {props.newOrderStatus.error && `Order Has Been Errorred : ${props.newOrderStatus.error}`}
            </div>
            {props.newOrderStatus.saving ? <Spinner /> : (<div><input onChange={changeName} type="text" name='name' placeholder='Your Name' />
            <input onChange={changeStreet} type="text" name='street' placeholder='Your Address' />
            <input onChange={changeCity} type="text" name='city' placeholder='Your City' />
            <Button text="Order Send" btnType='Success' clicked={saveOrder} /></div>)}
        </div>
        )
}

const mapStateToProps = state => {
    return {
        price: state.BurgerReducer.totalPrice,
        ingredients: state.BurgerReducer.ingredients,
        newOrderStatus: state.OrderReducer.newOrder,
        userID: state.SignupReducer.userID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        SaveOrderAction: (OrderInfo) => dispatch(actions.saveOrder(OrderInfo)),
        clearOrder: () => dispatch(actions.clearOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));