import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  count: number;
}

function PlacesList({ count }: PlacesListProps): JSX.Element {
  const cards: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    cards.push(<PlaceCard isFavoritesPage={false}></PlaceCard>);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {cards}
    </div>
  );
}

export default PlacesList;
