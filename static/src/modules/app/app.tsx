/**
 * 应用入口模块
 * @author VenDream
 * @since 2019-4-23
 */

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
import store, { history } from 'store';

// query对象
const QUERY = qs.parse(window.location.search.substr(1));

document.addEventListener('DOMContentLoaded', () => {
  // 禁用iOS300ms点击延迟
  initReactFastclick();
});

// 调试模式下动态引入移动端调试工具
if (+QUERY['debug'] === 1 || QUERY['debug'] === 'true') {
  import('eruda').then(({ default: eruda }) => eruda.init());
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('.gallery-x')
);

// Enable HMR
if (process.env.NODE_ENV === 'development') {
  const HMR = (module as any).hot;
  HMR && HMR.accept && HMR.accept();
}
