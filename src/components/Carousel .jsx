import React from 'react';
import ReactSwipe from 'react-swipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPercent } from '@fortawesome/free-solid-svg-icons';

function Carousel() {
  let reactSwipeEl;
  const arrImage = [
    {
      id: 1,
      percent: 20,
      price: 2300,
      imageUrl: 'https://www.ixbt.com/img/n1/news/2020/1/6/dims_0_large.jpeg',
      title: 'Nike Adapt BB 2.0.',
    },
    {
      id: 2,
      percent: 10,
      price: 3299,
      imageUrl:
        'https://www.sneakerfiles.com/wp-content/uploads/2019/09/nike-adapt-huarache-opti-yellow-bv6397-710-release-date-info-1.jpg',
      title: 'Nike Adapt Huarache',
    },
    {
      id: 3,
      percent: 15,
      price: 4099,
      imageUrl: 'https://cdnimg.rg.ru/img/content/164/10/21/naik_d_850.jpg',
      title: 'Nike Adapt BB',
    },
    {
      id: 4,
      percent: 30,
      price: 2999,
      imageUrl:
        'https://images.stockx.com/images/Nike-Adapt-Huarache-Black-Racer-Blue-US-Charger.jpg?fit=fill&bg=FFFFFF&w=480&h=320&auto=compress&q=90&dpr=2&trim=color&updated_at=1614195092&pad=0&fm=webp',
      title: 'Nike Adapt Huarache Black Racer Blue',
    },
    {
      id: 5,
      percent: 20,
      price: 3199,
      imageUrl: 'https://cdn.sportmaster.ua/static/i/2000_2000/products/246327/fn7NDBbw.jpeg',
      title: 'Puma Retaliate',
    },
  ];

  return (
    <div className="slider">
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true }}
        ref={(el) => (reactSwipeEl = el)}>
        {arrImage.map((obj) => (
          <div key={obj.id} className="slide">
            <img src={obj.imageUrl} alt="img" />
            <div className="percent">
              <b>Скидка</b>
              <div>
                <b>{obj.percent}</b>
                {<FontAwesomeIcon icon={faPercent} />}
              </div>
            </div>
            {obj.title && (
              <div className="item--title">
                <h2>{obj.title}</h2>
                <div className="item--price">
                  <span>{obj.price} - грн</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </ReactSwipe>
      <button className="slider--button left" onClick={() => reactSwipeEl.prev()}>
        {<FontAwesomeIcon icon={faChevronLeft} />}
      </button>
      <button className="slider--button right" onClick={() => reactSwipeEl.next()}>
        {<FontAwesomeIcon icon={faChevronRight} />}
      </button>
    </div>
  );
}

export default Carousel;
