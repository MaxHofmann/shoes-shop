import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Drawer, Header } from './components';
import Home from './pages/Home.jsx';
import Favorite from './pages/Favorite';
import AppContext from './context.js';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const itemsUrl = `https://6145cc0038339400175fc700.mockapi.io/api/Shoes`;
  const favoriteUrl = `https://6145cc0038339400175fc700.mockapi.io/api/favorites`;
  const cartUrl = `https://6145cc0038339400175fc700.mockapi.io/api/cart`;
  const ordersUrl = `https://6145cc0038339400175fc700.mockapi.io/api/orders`;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [orderResponse, cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
          axios.get(ordersUrl),
          axios.get(cartUrl),
          axios.get(favoriteUrl),
          axios.get(itemsUrl),
        ]);

        setIsLoading(false);

        setOrderItems(orderResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log('Ошибка при запросе на сервер');
      }
    }
    fetchData();
  }, [itemsUrl, favoriteUrl, cartUrl, ordersUrl]);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.keyCard) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.keyCard) !== Number(obj.id)));
        await axios.delete(`https://6145cc0038339400175fc700.mockapi.io/api/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6145cc0038339400175fc700.mockapi.io/api/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.keyCard === data.keyCard) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.error('Ошибка при добавлении в корзину');
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6145cc0038339400175fc700.mockapi.io/api/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      console.error('Ошибка при удалении из корзины');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((item) => Number(item.keyCard) === Number(obj.id));
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => Number(item.keyCard) !== Number(obj.id)));
        await axios.delete(`https://6145cc0038339400175fc700.mockapi.io/api/favorites/${findItem.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6145cc0038339400175fc700.mockapi.io/api/favorites', obj);
        setFavorites((prev) =>
          prev.map((item) => {
            if (item.keyCard === data.keyCard) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.error('Ошибка при добавлении в закладки');
    }
  };

  const onRemoveFavorite = (id) => {
    axios.delete(`https://6145cc0038339400175fc700.mockapi.io/api/favorites/${id}`);
    setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.keyCard) === Number(id));
  };

  const isItemFavoriteAdded = (id) => {
    return favorites.some((obj) => Number(obj.keyCard) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        orderItems,
        isItemAdded,
        isItemFavoriteAdded,
        setCartItems,
      }}>
      <div className="wrapper">
        <div className={cartOpened ? 'content clear' : 'content'}>
          {cartOpened && (
            <Drawer
              onClose={() => setCartOpened(false)}
              items={cartItems}
              onRemove={onRemoveItem}
            />
          )}
          <Header onClickCart={() => setCartOpened(true)} />
          <Route path="/" exact>
            <Home
              items={items}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/favorite" exact>
            <Favorite onRemove={onRemoveFavorite} />
          </Route>

          <Route path="/orders" exact>
            <Orders />
          </Route>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
