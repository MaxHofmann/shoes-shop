import React from 'react';
import { Card, ModalCard } from '../components';
import Carousel from '../components/Carousel ';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBackspace } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../context.js';

function Home({ items, onAddToCart, onAddToFavorite, isLoading, onClose }) {
  const [modalItems, setModalItems] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const { selectSize, setSelectSize } = React.useContext(AppContext);

  const onSearchValue = () => {
    setSearchValue(inputValue);
  };

  const onSearchBackspace = () => {
    if(inputValue.length > 0) {
      setInputValue('')
    }
    setSearchValue('');
  };

  const onChangeValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <main className="main">
      <div className="container">
        <Carousel />
        <div className="content__items--top">
          <h1>{searchValue ? `поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search__block">
            <i onClick={onSearchValue} className="fas fa-search">
              {<FontAwesomeIcon icon={faSearch} />}
            </i>
            <input onChange={onChangeValue} value={inputValue} type="text" placeholder="поиск..." />
            <i onClick={onSearchBackspace} className="fas fa-search-backspace">
              {<FontAwesomeIcon icon={faBackspace} />}
            </i>
          </div>
        </div>
        <ul className={modalItems ? 'content__items modal--items' : 'content__items'}>
          {isLoading || isLoading == null
            ? null
            : items
                .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                .map((obj) => (
                  <Card
                    key={obj.id}
                    keyCard={obj.id}
                    id={obj.id}
                    imageUrl={obj.avatar}
                    name={obj.name}
                    price={obj.price}
                    arrayImages={obj.arrayImages}
                    description={obj.description}
                    discount={obj.discount}
                    sizes={obj.size}
                    size={obj.size[0]}
                    thereAre={obj.thereAre}
                    sizeItem={obj.size[0]}
                    selectSize={selectSize}
                    onAddItem={(obj) => onAddToCart(obj)}
                    onAddFavoriteItem={(obj) => onAddToFavorite(obj)}
                    setModalItems={setModalItems}
                  />
                ))}
          {modalItems && (
            <ModalCard
              id={modalItems.id}
              keyCard={modalItems.keyCard}
              imageUrl={modalItems.imageUrl}
              name={modalItems.name}
              price={modalItems.price}
              arrayImages={modalItems.arrayImages}
              description={modalItems.description}
              discount={modalItems.discount}
              sizes={modalItems.sizes}
              size={modalItems.sizes[0]}
              thereAre={modalItems.thereAre}
              onClose={onClose}
              setSelectSize={setSelectSize}
              onAddItem={(obj) => onAddToCart(obj)}
              onAddFavoriteItem={(obj) => onAddToFavorite(obj)}
            />
          )}
        </ul>
      </div>
    </main>
  );
}

export default Home;
