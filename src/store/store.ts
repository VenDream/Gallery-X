/**
 * 应用redux store
 * @author VenDream
 * @since 2018-1-24
 */

import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as subReducers from '../reducers';

const reducers = combineReducers({ ...subReducers });

// 开启redux调试工具支持
const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const devTool = extension ? extension() : (f: any) => f;

const enhancer = compose(applyMiddleware(thunk), devTool);

export default createStore(reducers, enhancer);
