/**
 * 插画状态同步
 * @author VenDream
 * @since 2018-4-27
 */

import { AnyAction } from 'redux';
import deepExtend from 'deep-extend';
import ACTIONS from '../constants/actions';

// 扁平化的illust状态
const initState = {
  // 具体的illust对象
  byId: {},
  // illust引用集合
  ids: [],
  // 激活的illust
  activeId: '',
  // 状态 0: 就绪，1: 加载中，2: 加载失败 3: 加载完毕
  status: 0,
};

export default function reducer(state = initState, action: AnyAction) {
  switch (action) {
    default:
      return state;
  }
}
