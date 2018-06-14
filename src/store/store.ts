/**
 * 应用redux store
 * @author VenDream
 * @since 2018-6-14
 *
 * @note 这里需要注入react-router-redux的一些必要东西，
 *       参考官方example：https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
 */

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
  routerReducer,
  routerMiddleware,
  RouterState,
} from 'react-router-redux';

import * as subReducers from 'reducers';
export const history = createBrowserHistory();

type AllStoreState = StoreState & { router: RouterState };

// 路由中间件
const router = routerMiddleware(history);

// 开启redux调试工具支持
const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const devTool = extension ? extension() : (f: any) => f;
const enhancer = compose<StoreEnhancerStoreCreator<AllStoreState>>(
  applyMiddleware(thunk, router),
  devTool
);

const reducer = combineReducers<AllStoreState>({
  ...subReducers,
  // 注入路由状态
  router: routerReducer,
});

export default createStore(reducer, enhancer);
