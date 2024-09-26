import { FormEvent, useRef } from 'react';
import Layout from '../../components/layout/layout';
import { useAppDispatch } from '../../hooks';
import { logIn } from '../../store/slices/user/user.thunks';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (emailRef.current && passwordRef.current) {
      dispatch(logIn({ email: emailRef.current?.value, password: passwordRef.current?.value }));
    }
  };

  return (
    <Layout className="page--gray page--login" disableNav>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required={undefined}></input>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required={undefined}></input>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default LoginPage;
