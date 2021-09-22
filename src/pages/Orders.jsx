import React from 'react';
import axios from 'axios';
import { Card } from '../components';
import { useCart } from '../hooks/useCart';
import SkeletonBlock from '../components/Skeleton-block';

function Orders() {
  const { totalOrderPrice } = useCart();
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://6145cc0038339400175fc700.mockapi.io/api/orders');
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

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
            ? [...Array(8)].map((obj, index) => <SkeletonBlock key={index} />)
            : orders.map((obj) => (
                <Card
                  key={obj.id}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  name={obj.name}
                  price={obj.price}
                />
              ))}
        </ul>
      </div>
    </main>
  );
}

export default Orders;
