import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function LogOutPage(): JSX.Element {
  return (
    <Navigate to={AppRoute.Main} />
  );
}
