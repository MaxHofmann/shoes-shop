import React from 'react';

function DrawerCardInfo({ image, title }) {
  return (
    <div className="remove__wrapper">
      <div className="image__remove">
        <img src={image} alt="cart" />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default DrawerCardInfo;
