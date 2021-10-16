import React from 'react';
import { Card } from '../components';
import AppContext from '../context.js';

function Favorite({ onRemove }) {
  const { favorites, isLoading, selectSize, setFlagsPage } = React.useContext(AppContext);

  React.useEffect(() => {
    setFlagsPage(2);
  }, [setFlagsPage]);

  return (
    <main className="main">
      <div className="container">
        <div className="content__items--top">
          <h1>Все закладки</h1>
        </div>
        <ul className="content__items">
          {isLoading
            ? null
            : favorites.map((obj) => (
                <Card
                  key={obj.id}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  name={obj.name}
                  price={obj.price}
                  sizeItem={obj.size}
                  selectSize={selectSize}
                  onRemoveCard={onRemove}
                />
              ))}
        </ul>
      </div>
    </main>
  );
}

export default Favorite;
