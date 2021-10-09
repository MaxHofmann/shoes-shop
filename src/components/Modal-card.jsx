import React from 'react';
import AppContext from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faPercent,
  faBackspace,
  faCheckSquare,
  faPlusSquare,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function ModalCard({
  id,
  keyCard,
  imageUrl,
  name,
  price,
  arrayImages,
  description,
  discount,
  sizes,
  thereAre,
  onClose,
  setSelectSize,
  onAddItem,
  onAddFavoriteItem,
}) {
  const [srcImage, setSrcImage] = React.useState(imageUrl);
  const [animationTrigger, setClassImage] = React.useState(false);
  const [fullImage, setFullImage] = React.useState(null);
  const [classSize, setClassSize] = React.useState(0);
  const [sizeItem, setAddSizeItem] = React.useState(sizes[0]);
  const [selectSize, setAddSelectItem] = React.useState({
    id: id,
    size: sizes[0],
  });
  console.log(sizeItem, selectSize);
  const { cardOpened, isItemAdded, isItemFavoriteAdded } = React.useContext(AppContext);

  React.useEffect(() => {
    return () => {
      setClassImage(!animationTrigger);
      if (!arrayImages.includes(srcImage)) {
        setSrcImage(arrayImages[0]);
      }
    };
  }, [srcImage, animationTrigger, setSelectSize, arrayImages, imageUrl]);

  const onCloseModal = () => {
    onClose();
    setAddSelectItem(sizes[0]);
    setSelectSize("");
    setAddSelectItem("");
    setClassSize(0);
  };

  const onImage = (event) => {
    setSrcImage(event.target.src);
    event.preventDefault();
  };

  const onFullImage = (event) => {
    setFullImage(event.target.children[0].src);
  };

  const onCloseFullImage = () => {
    setFullImage(null);
  };

  const onSelectSize = (event) => {
    setSelectSize({ id: id, size: event.target.innerText });
    setAddSelectItem({ id: id, size: event.target.innerText });
    setClassSize(+event.target.id);
  };

  const onAddCard = () => {
    onAddItem({ id, name, imageUrl, price, keyCard, sizeItem, selectSize });
  };

  const onAddFavorite = () => {
    onAddFavoriteItem({ id, name, imageUrl, price, keyCard, sizeItem, selectSize });
  };


  return (
    <li
      className={classNames({
        'modal--item open': cardOpened,
        'modal--item close': !cardOpened,
      })}>
      <button onClick={onCloseModal} className="button--icon fas fa-backspace modal--backspace">
        {<FontAwesomeIcon icon={faBackspace} />}
      </button>
      <div className="modal--content-top">
        <div
          className={
            fullImage ? 'modal__item--left modal__item--left--fullImage' : 'modal__item--left'
          }>
          {arrayImages.map((item, index) => (
            <div onClick={onFullImage} key={index} className="wrapper__images">
              <img onMouseMove={onImage} src={item} alt="img" />
            </div>
          ))}
        </div>
        <div className="modal__item--center">
          <div className="modal__size">
            <h4>Размеры :</h4>
            <div className="modal__sizes--block">
              {sizes.map((item, index) => (
                <span
                  className={classNames({
                    'this--size': classSize === index,
                    size: classSize !== index,
                  })}
                  onClick={onSelectSize}
                  id={index}
                  key={index}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="modal__availability">
            {thereAre ? (
              <div className="yeas--icon">
                <span>
                  <b>Есть в наличии :</b> <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              </div>
            ) : (
              <div className="no--icon">
                <span>
                  <b>Есть в наличии :</b> <FontAwesomeIcon icon={faTimesCircle} />
                </span>
              </div>
            )}
          </div>
          <div className="modal__price">
            <span>
              <b>Цена :</b> {price}
              {discount > 0 && (
                <span>
                  {' '}
                  - {discount} <FontAwesomeIcon icon={faPercent} />
                </span>
              )}
            </span>
          </div>
          {discount > 0 && (
            <div className="modal__price discount">
              <span>
                <b>Цена со скидкой : </b>
                <span className="column">
                  <span>{price - (price * discount) / 100} </span>
                </span>
              </span>
            </div>
          )}
          <div className="modal--icon--wrapper">
            {onAddFavoriteItem && (
              <button
                onClick={onAddFavorite}
                className={
                  isItemFavoriteAdded(id)
                    ? 'button--icon modal--icon fas fa-heart heart-active'
                    : 'button--icon modal--icon fas fa-heart'
                }>
                {<FontAwesomeIcon icon={faHeart} />}
              </button>
            )}
            {onAddItem && thereAre && (
              <button
                onClick={onAddCard}
                className={
                  isItemAdded(id)
                    ? 'button--icon modal--icon fas fa-check'
                    : 'button--icon modal--icon fas fa-plus-square'
                }>
                {isItemAdded(id) ? (
                  <FontAwesomeIcon icon={faCheckSquare} />
                ) : (
                  <FontAwesomeIcon icon={faPlusSquare} />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="modal__item--right">
          <div className={animationTrigger ? 'wrapper__img first' : 'wrapper__img two'}>
            <img id={id} src={srcImage} alt="img" />
          </div>
          <div className="modal__item--name">
            <h2>{name}</h2>
          </div>
        </div>
      </div>
      <div className="modal__content--bottom">
        <div className="modal__item--description">
          <h3>Описание</h3>
          <p>{description}</p>
        </div>
      </div>
      {fullImage && (
        <div className="wrapper__full--image">
          <button onClick={onCloseFullImage} className="button--icon close--image">
            {<FontAwesomeIcon icon={faTimesCircle} />}
          </button>
          <img src={fullImage} alt="img" />
        </div>
      )}
    </li>
  );
}

export default ModalCard;
