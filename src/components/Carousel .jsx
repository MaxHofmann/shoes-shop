import React from 'react';
import ReactSwipe from 'react-swipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPercent } from '@fortawesome/free-solid-svg-icons';

function Carousel() {
  let reactSwipeEl;
  const arrImage = [
    { id: 1, percent: 20, imageUrl: 'https://www.ixbt.com/img/n1/news/2020/1/6/dims_0_large.jpeg' },
    {
      id: 2,
      percent: 10,
      imageUrl: 'https://www.sneakerfiles.com/wp-content/uploads/2019/09/nike-adapt-huarache-opti-yellow-bv6397-710-release-date-info-1.jpg',
    },
    {
      id: 3,
      percent: 15,
      imageUrl:
        'https://cdnimg.rg.ru/img/content/164/10/21/naik_d_850.jpg',
    },
    {
      id: 4,
      percent: 30,
      imageUrl:
        'https://www.ferra.ru/thumb/1800x0/filters:quality(75):no_upscale()/imgs/2021/01/21/13/4468448/316358b2d98dcfa60750b818ac218a2ca1fd703f.png',
    },
    {
      id: 5,
      percent: 20,
      imageUrl: 'https://cdn.sportmaster.ua/static/i/2000_2000/products/246327/fn7NDBbw.jpeg',
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
            <div className="percent"><b>{obj.percent}</b>{<FontAwesomeIcon icon={faPercent} />}</div>
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
