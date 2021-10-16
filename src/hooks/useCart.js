import React from 'react';
import AppContext from '../context';

export const useCart = () => {
  const { cartItems, setCartItems, orderItems, isLoading } = React.useContext(AppContext);
  let totalPrice = 0;
  cartItems.forEach((item) => (totalPrice += item.price));



  return { cartItems, setCartItems, totalPrice, orderItems, isLoading };
};
