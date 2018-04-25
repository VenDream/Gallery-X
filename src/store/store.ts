/**
 * 应用redux store
 * @author VenDream
 * @since 2018-4-25
 *
 * @note 这里需要注入react-router-redux的一些必要东西，
 *       参考官方example：https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
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
