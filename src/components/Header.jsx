import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { logo } from '../assets/img';

function Header({ onClickCart }) {
  const { totalPrice } = useCart();
  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <div className="header__content--left">
            <img src={logo} alt="logo" />
            <h3>Shop shoes</h3>
          </div>
        </Link>

        <ul className="header__content--right">
          <li>
            <button onClick={onClickCart} className="button--icon fas fa-cart-plus"></button>
          </li>
          <span>{totalPrice} грн.</span>
          <Link to="/favorite">
            <button className="button--icon fab fa-gratipay"></button>
          </Link>
          <li>
            <Link to="/orders">
              <button className="button--icon fas fa-user-circle"></button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
