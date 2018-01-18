/**
 * 应用入口模块
 * @author VenDream
 * @since 18/01/18
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './app.less';

import test from 'components/test/test';

console.log(test);

ReactDOM.render(<a>Halo, PP Shrink</a>, document.querySelector('.gallery-x'));
