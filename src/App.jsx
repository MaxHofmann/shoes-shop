import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Drawer, Header } from './components';
import Home from './pages/Home.jsx';
import Favorite from './pages/Favorite';
import AppContext from './context.js';
import Orders from './pages/Orders';
import classNames from 'classnames';

function App() {
  const [items, setItems] = React.useState([]);
  const [itemsLength, setItemsLength] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(24);
  const [fetching, setFetching] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState('drawer');
  const [cardOpened, setCardOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectSize, setSelectSize] = React.useState('');
  
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
          axios.get(`https://6145cc0038339400175fc700.mockapi.io/api/Shoes`),
        ]);

        setIsLoading(false);
        setOrderItems(orderResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setTotalCount(itemsResponse.data.length);
        setFetching(true)
      } catch (error) {
        console.log('Ошибка при запросе на сервер');
      }
    }
    fetchData();
  }, [favoriteUrl, cartUrl, ordersUrl]);

  React.useEffect(() => {
    if (fetching ) {
      axios
        .get(`https://6145cc0038339400175fc700.mockapi.io/api/Shoes?page=1&limit=${itemsLength}`)
        .then((response) => {
          setItems(response.data);
          setItemsLength((prevState) => prevState + 8);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.keyCard) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.keyCard) !== Number(obj.id)));
        await axios.delete(`https://6145cc0038339400175fc700.mockapi.io/api/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://6145cc0038339400175fc700.mockapi.io/api/cart',
          obj,
        );
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
        await axios.delete(
          `https://6145cc0038339400175fc700.mockapi.io/api/favorites/${findItem.id}`,
        );
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://6145cc0038339400175fc700.mockapi.io/api/favorites',
          obj,
        );
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.keyCard) === Number(id));
  };

  const isItemFavoriteAdded = (id) => {
    return favorites.some((obj) => Number(obj.keyCard) === Number(id));
  };

  const scrollHandler = (event) => {
    if (
      event.target.documentElement.scrollHeight -
        (event.target.documentElement.scrollTop + window.innerHeight) <
        60 && event.target.documentElement.scrollHeight -
        (event.target.documentElement.scrollTop + window.innerHeight) > 40 &&
      itemsLength-8 < totalCount
    ) {
      setFetching(true);
      console.log('scroll -', itemsLength-8);
    } 
  };
  // console.log('l', itemsLength);
  // console.log('t', totalCount);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        items,
        cartItems,
        favorites,
        orderItems,
        selectSize,
        isItemAdded,
        isItemFavoriteAdded,
        setCartItems,
        setCardOpened,
        setSelectSize,
        cardOpened,
      }}>
      <div className="wrapper">
        <div
          className={classNames({
            content:
              (cartOpened === 'drawer' && cardOpened === false) ||
              (cartOpened === false && cardOpened === false),
            'content clear':
              (cartOpened === true && cardOpened === false) ||
              (cartOpened === 'drawer' && cardOpened === true) ||
              (cartOpened === false && cardOpened === true),
          })}>
          {
            <Drawer
              cartOpened={cartOpened}
              onClose={() => setCartOpened(false)}
              items={cartItems}
              onRemove={onRemoveItem}
            />
          }
          <Header onClickCart={() => setCartOpened(true)} />
          <Route path="/" exact>
            <Home
              items={items}
              itemsLength={itemsLength}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              isLoading={isLoading}
              onClose={() => setCardOpened(false)}
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
