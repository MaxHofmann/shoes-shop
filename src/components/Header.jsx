import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { logo } from '../assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faUserCircle, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function Header({ onClickCart, flagsPage, setFlagsPage }) {
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
            <button onClick={onClickCart} className="button--icon fas fa-cart-plus">
              {<FontAwesomeIcon icon={faCartPlus} />}
            </button>
          </li>
          <span>{totalPrice} грн.</span>
          <Link to="/">
            <button
              onClick={() => setFlagsPage(1)}
              className={classNames({
                'button--icon fa-home active': flagsPage === 1,
                'button--icon fa-home': flagsPage
              })}>
              {<FontAwesomeIcon icon={faHouseUser} />}
            </button>
          </Link>
          <Link to="/favorite">
            <button
              onClick={() => setFlagsPage(2)}
              className={classNames({
                'button--icon fab fa-gratipay active': flagsPage === 2,
                'button--icon fab fa-gratipay': flagsPage
              })}>
              {<FontAwesomeIcon icon={faHeart} />}
            </button>
          </Link>
          <li>
            <Link to="/orders">
              <button
                onClick={() => setFlagsPage(3)}
                className={classNames({
                  'button--icon fas fa-user-circle active': flagsPage === 3,
                  'button--icon fas fa-user-circle': flagsPage
                })}>
                {<FontAwesomeIcon icon={faUserCircle} />}
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
