import Map from '../map/map';
import CitiesEmpty from './cities-empty/cities-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Places from '../places/places';
import { getSortedCityOffers } from '../../store/slices/app/app.selectors';
import { getActiveOfferLocation } from '../../store/slices/offers/offers.selectors';
import { setActiveOffer } from '../../store/slices/offers/offers.slice';
import { Offer } from '../../types/offer';

export default function Cities(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortedCityOffers = useAppSelector(getSortedCityOffers);
  const activeOfferLocation = useAppSelector(getActiveOfferLocation);

  const isEmpty = sortedCityOffers.length === 0;

  const handleActivePlaceChange = (activeOffer: Offer | null) => dispatch(setActiveOffer(activeOffer));

  return (
    <div className="cities">
      {
        isEmpty
          ? <CitiesEmpty />
          : (
            <div className="cities__places-container container">
              <Places offers={sortedCityOffers} onActivePlaceChange={handleActivePlaceChange} />
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  activeLocation={activeOfferLocation}
                  offers={sortedCityOffers}
                  anchor={sortedCityOffers[0].city.location}
                  mapOptions={{ zoomControl: false }}
                />
              </div>
            </div>
          )
      }
    </div>
  );
}
