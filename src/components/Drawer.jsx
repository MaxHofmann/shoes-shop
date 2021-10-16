import React from 'react';
import axios from 'axios';
import { DrawerCard, DrawerCardInfo } from '.';
import { removeCart, check } from '../assets/img';
import { useCart } from '../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function Drawer({ onClose, onRemove, items, cartOpened }) {
  const ordersUrl = `https://6145cc0038339400175fc700.mockapi.io/api/orders`;
  const cartUrl = `https://6145cc0038339400175fc700.mockapi.io/api/cart`;
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderCoplete, setIsOrderComplete] = React.useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const onClickOrder = async () => {
    try {
      await axios.post(ordersUrl, {
        items: cartItems,
      });
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`${cartUrl}/` + item.id);
        await delay(1000);
      }
    } catch (error) {
      console.log('не удалось оформить заказ');
    }
  };

  return (
    <div
      className={classNames({
        drawer: cartOpened === 'drawer',
        'drawer open-drawer': cartOpened === true,
        'drawer close-drawer': cartOpened === false,
      })}>
      <div className="drawer__block">
        <div className="drawer__block--top">
          <h2>Корзина</h2>
          <button onClick={onClose} className="button--icon fas fa-backspace">
            {<FontAwesomeIcon icon={faBackspace} />}
          </button>
        </div>
        {items.length > 0 ? (
          <>
            <ul className="drawer--items">
              {items.map((obj) => (
                <DrawerCard
                  key={obj.keyCard}
                  keyCard={obj.keyCard}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  name={obj.name}
                  price={obj.price}
                  sizeItem={obj.size}
                  selectSize={obj.selectSize.size}
                  onRemoveCard={onRemove}
                />
              ))}
            </ul>
            <div className="drawer__block--bottom">
              <div>
                <div className="drawer__block--price">
                  <span>Итого : </span>
                  <b>{totalPrice} грн.</b>
                </div>
              </div>
              <button onClick={onClickOrder} className="button">
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          <DrawerCardInfo
            image={isOrderCoplete ? check : removeCart}
            title={
              isOrderCoplete
                ? 'Ваш заказ оформлен'
                : 'Ваша корзина пуста, если вы хотите что-то купить, вам нужно вернуться в меню покупок.'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
