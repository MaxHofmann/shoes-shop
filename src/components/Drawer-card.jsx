import React from 'react';

function DrawerCard({ id, keyCard, name, imageUrl, price, onRemoveCard }) {
  return (
    <li className="drawer--item">
      <div className="wrapper--img">
        <img src={imageUrl} alt="shoes" />
      </div>
      <div className="item__block--right">
        <div className="item--price">
          <h3>{name}</h3>
          <span>
            Цена: <b>{price} грн.</b>
          </span>
        </div>
        <button onClick={() => onRemoveCard(id)} className="button--icon fas fa-times"></button>
      </div>
    </li>
  );
}

export default DrawerCard;
