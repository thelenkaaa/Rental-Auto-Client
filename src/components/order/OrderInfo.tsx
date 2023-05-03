import React, { useState } from 'react'
import Order from './Order';

const OrderInfo = () => {

  const [order] = useState({
    Country: "Test",
    City: "Test",
    Address: "Test",
    AmountDays: "Gearbox",
    Color: "Available"
  })

  return (
      <Order
        Country={order.Country}
        City={order.City}
        Address={order.Address}
        AmountDays={order.AmountDays}
        Color={order.Color}
      />
  );
};
export default OrderInfo