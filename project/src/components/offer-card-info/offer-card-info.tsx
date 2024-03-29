import {generatePath, Link} from 'react-router-dom';
import {Offer} from '../../types/offers';
import {AppRoute} from '../../const';
import {adaptRatingForRendering} from '../../utils/utils';

type OfferCardInfoProps = {
  offer: Offer;
};

export default function OfferCardInfo({offer}: OfferCardInfoProps) {
  const {price, title, type, rating, isFavorite, id} = offer;
  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price} </b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={
          isFavorite ?
            'place-card__bookmark-button place-card__bookmark-button--active button' :
            'place-card__bookmark-button button'
        }
        type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${adaptRatingForRendering(rating)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={generatePath(AppRoute.Room, {id: id.toString()})}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  );
}
