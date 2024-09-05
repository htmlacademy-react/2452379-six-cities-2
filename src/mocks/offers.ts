import { Offer } from '../types/offer';

const offers: Offer[] = [
  {
    'id': '38f1d418-4802-44dd-969f-b7509ee9976e',
    'title': 'The Joshua Tree House',
    'type': 'room',
    'price': 232,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/4.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
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
    'id': 'ef07a429-a78d-4cea-8b40-e247d2225578',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'apartment',
    'price': 315,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/12.jpg',
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
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.9
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
];

export default offers;
