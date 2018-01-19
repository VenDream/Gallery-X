/**
 * 应用入口模块
 * @author VenDream
 * @since 18/01/18
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'normalize.css';
import './app.less';

import store from '../../store';
import App from '../../components/app';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.gallery-x')
);
