import React from 'react';
import AppContext from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

function Card({
  keyCard,
  id,
  name,
  imageUrl,
  price,
  onAddItem,
  onAddFavoriteItem,
  onRemoveCard,
}) {
  const { isItemAdded, isItemFavoriteAdded } = React.useContext(AppContext);

  const onAddCard = () => {
    onAddItem({ id, name, imageUrl, price, keyCard });
  };

  const onAddFavorite = () => {
    onAddFavoriteItem({ id, name, imageUrl, price, keyCard });
  };

  return (
    <li className="content--item">
      <div className="wrapper--img">
        {onAddFavoriteItem && (
          <button
            onClick={onAddFavorite}
            className={
              isItemFavoriteAdded(id)
                ? 'button--icon fas fa-heart heart-active'
                : 'button--icon fas fa-heart'
            }>{<FontAwesomeIcon icon={faHeart} />}</button>
        )}
        {onRemoveCard && (
          <button
            onClick={() => onRemoveCard(id, keyCard)}
            className="button--icon fas fa-heart heart-active">
              {<FontAwesomeIcon icon={faHeart} />}
            </button>
        )}
        <img src={imageUrl} alt="shoes" />
      </div>
      <h3>{name}</h3>
      <div className="item--content">
        <div className="item--price">
          <span>Цена:</span>
          <b>{price} грн.</b>
        </div>
        {onAddItem && (
          <button
            onClick={onAddCard}
            className={
              isItemAdded(id) ? 'button--icon fas fa-check' : 'button--icon fas fa-plus-square'
            }>
              {isItemAdded(id) ? <FontAwesomeIcon icon={faCheckSquare} /> : <FontAwesomeIcon icon={faPlusSquare} />}
            </button>
        )}
      </div>
    </li>
  );
}

export default Card;
