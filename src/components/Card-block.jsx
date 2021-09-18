import React from 'react';
// import img from '../../public/img/shoes/img1.jpg'

function Card({ name, imageUrl, price }) {
  const [onAdded, setOnAdded] = React.useState(false);
  const [onAddedFavorite, setOnAddedFavorite] = React.useState(false);

  const onAddCard = () => {
    setOnAdded(!onAdded);
  };

  const onAddFavorite = () => {
    setOnAddedFavorite(!onAddedFavorite);
  };

  return (
    <li className="content--item">
      <div className="wrapper--img">
        <button
          onClick={onAddFavorite}
          className={
            onAddedFavorite ? 'button--icon fas fa-heart heart-active' : 'button--icon fas fa-heart'
          }></button>
        <img src={imageUrl} alt="shoes" />
      </div>
      <h3>{name}</h3>
      <div className="item--content">
        <div className="item--price">
          <span>Цена:</span>
          <b>{price} грн.</b>
        </div>
        <button
          onClick={onAddCard}
          className={
            onAdded ? 'button--icon fas fa-check' : 'button--icon fas fa-plus-square'
          }></button>
      </div>
    </li>
  );
}

export default Card;
