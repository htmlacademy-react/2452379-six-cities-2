import { Link } from 'react-router-dom';
import { CityName } from '../../types/city';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/slices/app/app.slice';


type CityLinkProps = {
  city: CityName;
  className?: string;
};

export default function CityLink({ className, city }: CityLinkProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeCity(city));
  };

  return (
    <Link
      className={className}
      to={AppRoute.Main}
      onClick={handleClick}
      data-testid="CityLink"
    >
      <span>{city}</span>
    </Link>
  );
}
