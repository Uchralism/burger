import React from 'react';
import { Route } from 'react-router-dom';
import Burger from '../../components/Burger';
import ContactData from '../../components/ContactData';
import Button from '../../components/General/Button';
import css from './style.module.css';
import { connect } from 'react-redux';

class ShippingPage extends React.Component {

    cancelOrder = () => {
        this.props.history.push('/');
    }

    showContactData = () => {
        this.props.history.replace('/ship/contact');
    }

    render() {
        return <div className={css.ShippingPage}>
            <p style={{fontSize:'26px'}}><strong>Your order information</strong></p>
            <p>Order total amount : <strong>{this.props.price}₮</strong></p>
            <Burger />
            <Button clicked={this.cancelOrder} btnType='Danger' text='Cancel Order' />
            <Button clicked={this.showContactData} btnType='Success' text='Enter order address' />
            <Route path={'/ship/contact'}>
                <ContactData />
            </Route>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        price: state.BurgerReducer.totalPrice
    }
}

export default connect(mapStateToProps)(ShippingPage)