import React from 'react';

import css from './style.module.css';

const Order = (props) => {
    return <div className={css.Order}>
        <p>Order Total Amount : <strong>{props.order.dun}₮</strong></p>
        <p>Order Address : {props.order.order_address.name} | {props.order.order_address.street} | {props.order.order_address.city}</p>
        <p>Ingredients : Bacon - {props.order.orts.bacon} | Salad - {props.order.orts.salad} | Meat - {props.order.orts.meat} | Cheese - {props.order.orts.cheese}</p>
    </div>
}

export default Order;