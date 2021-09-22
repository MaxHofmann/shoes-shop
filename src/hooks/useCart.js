import React from 'react';
import AppContext from '../context';

export const useCart = () => {
  const { cartItems, setCartItems, orderItems, isLoading } = React.useContext(AppContext);
  let totalPrice = 0;
  cartItems.forEach((item) => (totalPrice += item.price));

  let totalOrderPrice = 0;
  orderItems.forEach((item) => (totalOrderPrice += item.price));

  return { cartItems, setCartItems, totalPrice, orderItems, totalOrderPrice, isLoading };
};
