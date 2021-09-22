import React from 'react';
import { Card } from '../components';
import AppContext from '../context.js';
import SkeletonBlock from '../components/Skeleton-block';

function Favorite({ onRemove }) {
  const { favorites, isLoading } = React.useContext(AppContext);
  return (
    <main className="main">
      <div className="container">
        <div className="content__items--top">
          <h1>Все закладки</h1>
        </div>
        <ul className="content__items">
          {isLoading
            ? [...Array(8)].map((obj, index) => <SkeletonBlock key={index} />)
            : favorites.map((obj) => (
                <Card
                  key={obj.id}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  name={obj.name}
                  price={obj.price}
                  onRemoveCard={onRemove}
                />
              ))}
        </ul>
      </div>
    </main>
  );
}

export default Favorite;
