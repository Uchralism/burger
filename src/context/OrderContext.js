import React, { useState} from 'react';
import axios from '../axios-orders';

const OrderContext = React.createContext();

export const OrderStore = props => {
    const initialState = {
        orders: [],
        loading: false,
        error: null
    }

    const [state, setState] = useState(initialState);

    const loadOrderData = (userID, token) => {
        setState({ ...state, loading: true});
        
        axios.get(`orders.json?&auth=${token}&orderBy="userID"&equalTo="${userID}"`)
            .then(response => {
                const orderData = Object.entries(response.data).reverse();
                setState({ ...state, orders: orderData});
            })
            .catch(err => setState({ ...state, error: err}))
            .finally(setState({ ...state, loading: false}));
    };

    return (
        <OrderContext.Provider value={{ state, loadOrderData }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContext;
