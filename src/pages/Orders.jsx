import React from 'react';
import axios from 'axios';
import { Card } from '../components';
import AppContext from '../context.js';

function Orders() {
  const [totalOrderPrice, setTotalOrderPrice] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { selectSize, setFlagsPage } = React.useContext(AppContext);

  React.useEffect(() => {
    setFlagsPage(3);
  }, [setFlagsPage]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://6145cc0038339400175fc700.mockapi.io/api/orders');
        setOrders(data.reduce((privuceItem, item) => [...privuceItem, ...item.items], []));

        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);
  React.useEffect(() => {
    return () => {
      let sum = 0;
      orders.forEach((item) => (sum += item.price));
      setTotalOrderPrice(sum);
    };
  }, [orders, isLoading]);

  return (
    <main className="main">
      <div className="container">
        <div className="content__items--top">
          <h1>Мои заказы</h1>
          <div className="block--price">
            <p>Сумма ваших заказов: {totalOrderPrice} грн.</p>
          </div>
        </div>
        <ul className="content__items">
          {isLoading
            ? null
            : orders.map((obj) => (
                <Card
                  key={obj.keyCard}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  name={obj.name}
                  price={obj.price}
                  sizeItem={obj.size}
                  selectSize={selectSize}
                />
              ))}
        </ul>
      </div>
    </main>
  );
}

export default Orders;
