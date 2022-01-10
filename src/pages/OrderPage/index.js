import React, {useEffect} from 'react';
import Spinner from '../../components/General/Spinner';
import Order from '../../components/Order';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/OrderActions';

const OrderPage = props => {
    useEffect(() => {
        props.loadOrders(props.userID);
    }, []);

        return (
        <div>
            {props.loading ? <Spinner /> : props.orders.map(el => 
                <Order key={el[0]} order={el[1]} />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.OrderReducer.orders,
        loading: state.OrderReducer.loading,
        userID: state.SignupReducer.userID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOrders: (userID) => dispatch(actions.loadOrders(userID)),
        clearOrder: () => dispatch(actions.clearOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);