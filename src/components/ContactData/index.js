import React from 'react';
import Button from '../General/Button';
import css from './style.module.css';
import Spinner from '../General/Spinner';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/OrderActions';
class ContactData extends React.Component {
    state = {
        order_address: {
            name : null,
            city : null,
            street : null
        }
    };

    changeName = (e) => {
        this.setState({name: e.target.value})
    };
    changeStreet = (e) => {
        this.setState({street: e.target.value})
    };
    changeCity = (e) => {
        this.setState({city: e.target.value})
    };    

    componentDidUpdate() {
        if(this.props.newOrderStatus.finished && !this.props.newOrderStatus.error)
        this.props.history.push("/orders");
    }

    saveOrder = () => {
        const order = {
            userID: this.props.userID,
            orts: this.props.ingredients,
            dun: this.props.price,
            order_address: {
                name: this.state.name,
                city: this.state.city,
                street: this.state.street
            }
        };

        this.props.SaveOrderAction(order);
    }

    render() {
        return <div className={css.ContactData}>
            <div>
                {this.props.newOrderStatus.error && `Order Has Been Errorred : ${this.props.newOrderStatus.error}`}
            </div>
            {this.props.newOrderStatus.saving ? <Spinner /> : (<div><input onChange={this.changeName} type="text" name='name' placeholder='Your Name' />
            <input onChange={this.changeStreet} type="text" name='street' placeholder='Your Address' />
            <input onChange={this.changeCity} type="text" name='city' placeholder='Your City' />
            <Button text="Order Send" btnType='Success' clicked={this.saveOrder} /></div>)}
        </div>
    }
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
        SaveOrderAction: (OrderInfo) => dispatch(actions.saveOrder(OrderInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));