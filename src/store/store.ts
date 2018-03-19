/**
 * 应用redux store
 * @author VenDream
 * @since 2018-3-19
 */

import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as subReducers from '../reducers';

export const history = createBrowserHistory();

// 注入路由状态
const reducers = combineReducers({ ...subReducers, router: routerReducer });
// 注入路由中间件
const router = routerMiddleware(history);

// 开启redux调试工具支持
const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const devTool = extension ? extension() : (f: any) => f;

const enhancer = compose(applyMiddleware(thunk, router), devTool);

export default createStore(reducers, enhancer);
