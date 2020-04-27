import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Root } from './routes/index';
import stores from './stores';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={stores}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);