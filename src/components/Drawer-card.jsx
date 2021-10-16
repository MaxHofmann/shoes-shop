import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function DrawerCard({ id, keyCard, name, imageUrl, price, sizeItem, selectSize, onRemoveCard }) {
  return (
    <li className="drawer--item">
      <div className="wrapper--img">
        <img src={imageUrl} alt="shoes" />
      </div>
      <div className="item__block--right">
        <div className="item--price">
          <h3>{name}</h3>
          <span>
            Цена: <b>{price} грн</b>
          </span>
          <span>
            Размер: <b>{selectSize?selectSize:sizeItem} см</b>
          </span>
        </div>
        <button onClick={() => onRemoveCard(id)} className="button--icon fas fa-times">
          {<FontAwesomeIcon icon={faTimesCircle} />}
        </button>
      </div>
    </li>
  );
}

export default DrawerCard;
