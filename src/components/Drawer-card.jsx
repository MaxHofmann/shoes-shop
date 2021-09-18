import React from 'react';

function DrawerCard() {
  return (
    <li className="drawer--item">
      <div className="wrapper--img">
        <img src="/img/shoes/img1.jpg" alt="shoes" />
      </div>
      <div className="item__block--right">
        <div className="item--price">
          <h3>Мужские Кроссовки Nike Blazer Mid Suede</h3>
          <span>
            Цена: <b>600 грн.</b>
          </span>
        </div>
        <button className="button--icon fas fa-times"></button>
      </div>
    </li>
  );
}

export default DrawerCard;
