import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { Offer as OfferT, OfferFull, OfferId } from '../../types/offer';
import Offer from '../../components/offer/offer';
import { useEffect, useState } from 'react';
import PlacesList from '../../components/places-list/places-list';
import { Review } from '../../types/review';

function getOfferInfo(offerId: OfferId): Promise<OfferFull> {
  return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => ({
    'id': offerId,
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'description': 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
    'type': 'room',
    'price': 207,
    'images': [
      'https://13.design.htmlacademy.pro/static/hotel/17.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/20.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/8.jpg'
    ],
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.858610000000006,
      'longitude': 2.330499,
      'zoom': 16
    },
    'goods': [
      'Washer',
      'Coffee machine',
      'Air conditioning',
      'Heating',
      'Washing machine',
      'Wi-Fi',
      'Dishwasher',
      'Kitchen',
      'Baby seat'
    ],
    'host': {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://13.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    'isPremium': true,
    'isFavorite': false,
    'rating': 2.1,
    'bedrooms': 1,
    'maxAdults': 1
  })
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getNearOffers(offerId: OfferId): Promise<OfferT[]> {
  return new Promise((resolve) => setTimeout(resolve, 7000)).then(() => [{
    'id': '38f1d418-4802-44dd-969f-b7509ee9976e',
    'title': 'The Joshua Tree House',
    'type': 'room',
    'price': 232,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/4.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.858610000000006,
        'longitude': 2.331499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 3.8
  },
  {
    'id': '71610edf-c035-45d4-a8ba-7310cee0db52',
    'title': 'Wood and stone place',
    'type': 'hotel',
    'price': 187,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.335499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.9
  },
  {
    'id': '9401dcdc-be34-4e16-9a90-3f33fed976b4',
    'title': 'Wood and stone place',
    'type': 'hotel',
    'price': 429,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/3.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.85761,
      'longitude': 2.358499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.4
  },
  ]
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviews(offerId: OfferId): Promise<Review[]> {
  return new Promise((resolve) => setTimeout(resolve, 5000)).then(() =>
    [
      {
        'id': '81835ded-492a-4704-8087-561b7cb5a686',
        'comment': 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
        'date': '2024-08-27T21:00:00.403Z',
        'rating': 4,
        'user': {
          'name': 'Max',
          'avatarUrl': 'https://13.design.htmlacademy.pro/static/avatar/5.jpg',
          'isPro': false
        }
      },
      {
        'id': 'd3baefc4-01ec-46b8-ba06-d09fdc7c942f',
        'comment': 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
        'date': '2016-05-24T21:00:00.403Z',
        'rating': 2,
        'user': {
          'name': 'Emely',
          'avatarUrl': 'https://13.design.htmlacademy.pro/static/avatar/7.jpg',
          'isPro': false
        }
      },
      {
        'id': '536ebdad-cf25-4864-89a2-1014b7b57b33',
        'comment': 'Я просто круасаны хотел',
        'date': '2024-08-23T21:00:00.403Z',
        'rating': 3,
        'user': {
          'name': 'Паша',
          'avatarUrl': 'https://s0.rbk.ru/v6_top_pics/resized/200xH/media/img/4/94/347246112545944.webp',
          'isPro': true
        }
      }
    ]
  );
}

function OfferPage(): JSX.Element {
  const [offer, setOffer] = useState<OfferFull | null>(null);
  const [nearOffers, setNearOffers] = useState<OfferT[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const offerId = useParams().id;

  useEffect(() => {
    if (offerId) {
      getOfferInfo(offerId).then(setOffer);
      getNearOffers(offerId).then(setNearOffers);
      getReviews(offerId).then(setReviews);
    }
  }, [offerId]);

  return (
    <Layout>
      <main className="page__main page__main--offer">
        {offer && <Offer offer={offer} nearOffers={nearOffers} reviews={reviews} />}
        <div className="container">
          {nearOffers && <PlacesList offers={nearOffers} displayType='offer' />}
        </div>
      </main>
    </Layout>
  );
}

export default OfferPage;
