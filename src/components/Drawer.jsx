import React from 'react';
import { DrawerCard } from '.';

function Drawer({ onClose }) {
  return (
    <div className="drawer">
      <div className="drawer__block">
        <div className="drawer__block--top">
          <h2>Корзина</h2>
          <button onClick={onClose} className="button--icon fas fa-backspace"></button>
        </div>
        <ul className="drawer--items">
          <DrawerCard />
          <DrawerCard />
          <DrawerCard />
          <DrawerCard />
          <DrawerCard />
          <DrawerCard />
          <DrawerCard />
          <DrawerCard />
        </ul>
      </div>
      <div className="drawer__block--bottom">
        <div>
          <div className="drawer__block--price">
            <span>Итого : </span>
            <b>700 грн.</b>
          </div>
          <div className="drawer__block--tax">
            <span>Итого 1% : </span>
            <b>20 грн.</b>
          </div>
        </div>
        <button className="button">Оформить заказ</button>
      </div>
    </div>
  );
}

export default Drawer;
