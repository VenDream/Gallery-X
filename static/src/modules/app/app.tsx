/**
 * 应用入口模块
 * @author VenDream
 * @since 2019-2-15
 */

import '@babel/polyfill';
import qs from 'qs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import initReactFastclick from 'react-fastclick';

import 'normalize.css';
import 'assets/styles/iconfont.css';
import 'assets/styles/scrollbar.less';
import './app.less';

import App from 'containers/app';
import store, { history, MyContext } from 'store';

// query对象
const QUERY = qs.parse(window.location.search.substr(1));

document.addEventListener('DOMContentLoaded', () => {
  // 禁用iOS300ms点击延迟
  initReactFastclick();
});

// 调试模式下引入vConsole便于移动端调试
if (+QUERY['debug'] === 1 || QUERY['debug'] === 'true') {
  const vConsole = require('vconsole');
  const v = new vConsole();
}

ReactDOM.render(
  <Provider store={store} context={MyContext}>
    <ConnectedRouter history={history} context={MyContext}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('.gallery-x')
);

if (module['hot']) {
  module['hot'].accept();
}
