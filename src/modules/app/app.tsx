/**
 * 应用入口模块
 * @author VenDream
 * @since 2018-3-19
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import 'normalize.css';
import '../../assets/styles/iconfont.css';
import './app.less';

import store, { history } from '../../store';
import App from '../../containers/app';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('.gallery-x')
);
