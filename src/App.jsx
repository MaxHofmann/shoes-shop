import React from 'react';

import { Card, Drawer, Header } from './components';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false)

  return (
    <div className="wrapper">
      <div className="content">
        {cartOpened && <Drawer onClose={() => setCartOpened(false)}/>}
        <Header onClickCart={() => setCartOpened(true)}/>
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
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
