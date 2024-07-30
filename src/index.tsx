import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App cardsCount={10}/>
  </React.StrictMode>
);
