export type Token = string;

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

export const saveToken = (token: Token) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
