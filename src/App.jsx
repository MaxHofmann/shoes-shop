import React from 'react';
import axios from 'axios';

import { Card, Drawer, Header } from './components';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get(`https://6145cc0038339400175fc700.mockapi.io/api/Shoes`).then(({ data }) => {
      setItems(data);
    });
  }, []);

  console.log(items);

  return (
    <div className="wrapper">
      <div className="content">
        {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
        <Header onClickCart={() => setCartOpened(true)} />
        <main className="main">
          <div className="container">
            <div className="content__items--top">
              <h1>Все кроссовки</h1>
              <div className="search__block">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="поиск..." />
              </div>
            </div>
            <ul className="content__items">
              {items.map((obj) => (
                <Card
                  key={obj.id}
                  id={obj.id}
                  imageUrl={obj.avatar}
                  name={obj.name}
                  price={obj.price}
                />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
