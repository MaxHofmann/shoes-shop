import React from 'react';

function Card() {
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
        <img src="/img/shoes/img1.jpg" alt="shoes" />
      </div>
      <h3>Мужские Кроссовки Nike Blazer Mid Suede</h3>
      <div className="item--content">
        <div className="item--price">
          <span>Цена:</span>
          <b>600 грн.</b>
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
