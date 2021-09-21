import React from 'react';
import { Card } from '../components';
import SkeletonBlock from '../components/Skeleton-block';
import MySwiper from '../components/Swiper';

function Home({
  items,
  searchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) {
  
  return (
    <main className="main">
      <div className="container">
        <div className="content__items--top">
          <h1>{searchValue ? `поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search__block">
            <i className="fas fa-search"></i>
            <input onChange={onChangeSearchInput} type="text" placeholder="поиск..." />
          </div>
        </div>
        <ul className="content__items">
          <MySwiper/>
          {isLoading
            ? [...Array(8)].map((obj, index) => <SkeletonBlock key={index} />)
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
                    onAddItem={(obj) => onAddToCart(obj)}
                    onAddFavoriteItem={(obj) => onAddToFavorite(obj)}
                  />
                ))}
        </ul>
      </div>
    </main>
  );
}

export default Home;
