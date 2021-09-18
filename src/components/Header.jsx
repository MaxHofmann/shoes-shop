import React from 'react';

function Header({ onClickCart }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content--left">
          <img src="/img/logo.png" alt="logo" />
          <h3>Shop shoes</h3>
        </div>
        <ul className="header__content--right">
          <li>
            <i onClick={onClickCart} className="fas fa-cart-plus"></i>
          </li>
          <span>700 грн.</span>
          <i className="fab fa-gratipay"></i>
          <li>
            <i className="fas fa-user-circle"></i>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
