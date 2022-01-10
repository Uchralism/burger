import React from 'react';
import { Route } from 'react-router-dom';
import Burger from '../../components/Burger';
import ContactData from '../../components/ContactData';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';

const ShippingPage = props => {

    const cancelOrder = () => {
        props.history.push('/');
    }

    const showContactData = () => {
        props.history.replace('/ship/contact');
    }

        return (
        <div className={css.ShippingPage}>
            <p style={{fontSize:'26px'}}><strong>Your order information</strong></p>
            <p>Order total amount : <strong>{props.price}₮</strong></p>
            <Burger />
            <Button clicked={cancelOrder} btnType='Danger' text='Cancel Order' />
            <Button clicked={showContactData} btnType='Success' text='Enter order address' />
            <Route path={'/ship/contact'}>
                <ContactData />
            </Route>
        </div>
        )
}

const mapStateToProps = state => {
    return {
        price: state.BurgerReducer.totalPrice
    }
}

export default connect(mapStateToProps)(ShippingPage)