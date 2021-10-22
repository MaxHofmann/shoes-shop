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
  faImage,
  faListAlt,
  faAlignCenter,
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
  size,
  thereAre,
  onClose,
  setSelectSize,
  onAddItem,
  onAddFavoriteItem,
}) {
  const [srcImage, setSrcImage] = React.useState(arrayImages[0]);
  const [animationTrigger, setClassImage] = React.useState(false);
  const [fullImage, setFullImage] = React.useState(null);
  const [classSize, setClassSize] = React.useState(0);
  const [flagItem, setFlagItem] = React.useState(1);
  const [selectSize, setAddSelectItem] = React.useState({
    id: id,
    size: size,
  });
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
    setAddSelectItem(size);
    setSelectSize('');
    setAddSelectItem('');
    setClassSize(0);
  };

  const onImage = (event) => {
    setSrcImage(event.target.src);
    event.preventDefault();
  };

  const onFullImage = (event) => {
    setFullImage(event.target.children[0].src);
    setSrcImage(event.target.children[0].src);
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
    onAddItem({ id, name, imageUrl, price, keyCard, size, selectSize });
  };

  const onAddFavorite = () => {
    onAddFavoriteItem({ id, name, imageUrl, price, keyCard, size, selectSize });
  };

  return (
    <li
      className={classNames({
        'modal--item open': cardOpened,
        'modal--item close': !cardOpened,
      })}>
      <div className="wrapper__buttons--nav">
        <button onClick={onCloseModal} className="button--icon fas fa-backspace modal--backspace">
          {<FontAwesomeIcon icon={faBackspace} />}
        </button>
        <button
          onClick={() => setFlagItem(1)}
          className={classNames({
            'button--icon faImage active': flagItem === 1,
            'button--icon faImage': flagItem,
          })}>
          {<FontAwesomeIcon icon={faImage} />}
        </button>
        <button
          onClick={() => setFlagItem(2)}
          className={classNames({
            'button--icon faListAlt active': flagItem === 2,
            'button--icon faListAlt': flagItem,
          })}>
          {<FontAwesomeIcon icon={faListAlt} />}
        </button>

        <button
          onClick={() => setFlagItem(3)}
          className={classNames({
            'button--icon faAlignCenter active': flagItem === 3,
            'button--icon faAlignCenter': flagItem,
          })}>
          {<FontAwesomeIcon icon={faAlignCenter} />}
        </button>
      </div>

      <div className="modal--content-top">
        <div
          className={classNames({
            'modal__item--left modal__item--left--fullImage': fullImage,
            'modal__item--left active--item': flagItem === 1,
            'modal__item--left': fullImage === null,
          })}>
          {arrayImages.map((item, index) => (
            <div
              onClick={onFullImage}
              key={index}
              className={classNames({
                wrapper__images: arrayImages,
                'wrapper__images active': srcImage === item,
              })}>
              <img onMouseMove={onImage} src={item} alt="img" />
            </div>
          ))}
        </div>

        <div
          className={classNames({
            'modal__item--center': flagItem,
            'modal__item--center active--item': flagItem === 2,
          })}>
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
                  <b>В наличии : есть</b> <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              </div>
            ) : (
              <div className="no--icon">
                <span>
                  <b>В наличии : нет</b> <FontAwesomeIcon icon={faTimesCircle} />
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

        <div
          className={classNames({
            'modal__item--right': flagItem,
            'modal__item--right active--item': flagItem === 1,
          })}>
          <div className={animationTrigger ? 'wrapper__img first' : 'wrapper__img two'}>
            <img id={id} src={srcImage} alt="img" />
          </div>

          <div
            className={classNames({
              'modal__item--name': flagItem,
              'modal__item--name active--item': flagItem === 1,
            })}>
            <h2>{name}</h2>
            {thereAre ? (
              <div className="yeas--icon">
                <span>
                  <b>В наличии : есть</b> <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              </div>
            ) : (
              <div className="no--icon">
                <span>
                  <b>В наличии : нет</b> <FontAwesomeIcon icon={faTimesCircle} />
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames({
            'modal__content--bottom': flagItem,
            'modal__content--bottom active--item': flagItem === 3,
          })}>
          <div className="modal__item--description">
            <h3>Описание</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
      {fullImage && (
        <div
          className={classNames({
            'wrapper__full--image': fullImage,
          })}>
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
