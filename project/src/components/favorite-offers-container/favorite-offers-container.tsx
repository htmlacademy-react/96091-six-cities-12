import {Link} from 'react-router-dom';
import {Offers} from '../../types/offers';
import {OfferCardVariant} from '../../const';
import OfferCardList from '../offer-card-list/offer-card-list';


type FavoriteOffersContainerProps = {
  favoriteOffers: Offers;
};

export default function FavoriteOffersContainer({favoriteOffers}: FavoriteOffersContainerProps): JSX.Element {
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((city) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="/">
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <OfferCardList
              offers={favoriteOffers.filter((offer) => offer.city.name === city)}
              variant={OfferCardVariant.Favorites}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
