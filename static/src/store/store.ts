/**
 * 应用redux store
 * @author VenDream
 * @since 2019-2-15
 *
 * @note 这里需要注入connected-react-router的一些必要东西，
 *       参考官方example：https://github.com/supasate/connected-react-router#usage
 */

import React from 'react';
import {
  compose,
  combineReducers,
  createStore,
  applyMiddleware,
  StoreEnhancerStoreCreator,
} from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import {
  RouterState,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';

import * as subReducers from 'reducers';

type AllStoreState = StoreState & { router: RouterState };

// 生成全局history对象
export const history = createBrowserHistory();

// 生成路由中间件
const router = routerMiddleware(history);

// 开启redux调试工具支持
const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const devTool = extension ? extension() : (f: any) => f;

// 注入路由state，这里的key必须要写成router
const reducer = combineReducers<AllStoreState>({
  ...subReducers,
  router: connectRouter(history),
});

// 装载中间件
const enhancer = compose<StoreEnhancerStoreCreator<AllStoreState>>(
  applyMiddleware(thunk, router),
  devTool
);

export const MyContext = React.createContext(null);
export default createStore(reducer, enhancer);
