import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Layout from '../../components/layout/layout';
import { useAppDispatch } from '../../hooks';
import { logInThunk } from '../../store/slices/user/user.thunks';
import { UserLogIn } from '../../types/user';
import { toast } from 'react-toastify';
import { AVAILABLE_LOCATIONS } from '../../const';
import CityLink from '../../components/city-link/city-link';

const isValid = ({ email, password }: UserLogIn) =>
  email.match(/^\S+@\S+\.\S+$/) && password.match(/(?=.*[A-Za-z])(?=.*\d).+/);

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const randomCity = useRef(AVAILABLE_LOCATIONS[Math.floor(Math.random() * AVAILABLE_LOCATIONS.length)]);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (isValid({ email, password })) {
      dispatch(logInThunk({ email, password }));
    } else {
      toast.info('Invalid login or password');
    }
  };

  return (
    <Layout className="page--gray page--login" disableNav>
      <main className="page__main page__main--login" data-testid="LogInPage">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={undefined}
                  data-testid="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={undefined}
                  data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <CityLink className="locations__item-link" city={randomCity.current} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default LoginPage;
