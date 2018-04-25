/**
 * 应用入口模块
 * @author VenDream
 * @since 2018-4-24
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import initReactFastclick from 'react-fastclick';

import 'normalize.css';
import '../../assets/styles/iconfont.css';
import './app.less';

import store, { history } from '../../store';
import App from '../../containers/app';

document.addEventListener('DOMContentLoaded', () => {
  // 禁用iOS300ms点击延迟
  initReactFastclick();
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('.gallery-x')
);
