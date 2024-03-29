import {Helmet} from 'react-helmet-async';
import {Offers, Reviews} from '../../types/offers';
import {useParams} from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import {adaptRatingForRendering} from '../../utils/utils';
import {MAX_NUMBER_OFFER_IMAGE, OfferCardVariant} from '../../const';
import OfferCardList from '../../components/offer-card-list/offer-card-list';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';

type OfferProps = {
  offers: Offers;
  reviews: Reviews;
};

export default function RoomPage({offers, reviews}: OfferProps ): JSX.Element {
  const params = useParams();
  const currentId = Number(params.id);
  const offer = offers.find((item) => item.id === currentId);

  // Временная логика получения офферов неподалеку. В дальнейшем они будут приходить с сервера.
  const nearOffers = offers.filter((item) => item.id !== currentId);

  if (!offer) {
    return (<NotFoundPage />);
  }

  const {id, images, isPremium, isFavorite, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  const {name, isPro, avatarUrl} = host;
  const propertyImages = images.slice(0, MAX_NUMBER_OFFER_IMAGE);
  return (
    <main className="page__main page__main--property">
      <Helmet>
        <title>6 cities room</title>
      </Helmet>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {propertyImages.map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button className={isFavorite ?
                'property__bookmark-button property__bookmark-button--active button' :
                'property__bookmark-button button'} type="button"
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${adaptRatingForRendering(rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((item) => (
                  <li key={item} className="property__inside-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={
                  isPro ?
                    'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper' :
                    'property__avatar-wrapper user__avatar-wrapper'
                }
                >
                  <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {name}
                </span>
                {isPro ?
                  <span className="property__user-status">
                Pro
                  </span> :
                  null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <ReviewsList reviews={reviews} />
              <ReviewsForm />
            </section>
          </div>
        </div>
        <Map
          city={offer.city}
          offers={offers}
          variant={OfferCardVariant.Near}
          activeOfferCard={id}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferCardList offers={nearOffers} variant={OfferCardVariant.Near} />
        </section>
      </div>
    </main>
  );
}
