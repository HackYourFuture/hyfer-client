import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {unregister} from './registerServiceWorker';
import { Provider } from 'mobx-react';
import 'typeface-roboto';
import stores from './stores';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>
  , document.getElementById('root'));
unregister();
