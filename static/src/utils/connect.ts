/**
 * connect辅助函数
 * @author VenDream
 * @since 2019-3-11
 */

import { MyContext } from 'store';
import {
  connect,
  MapStateToPropsParam,
  MapDispatchToPropsParam,
} from 'react-redux';

/**
 * 获取connect后的组件，默认会连接全局context
 *
 * @export
 * @param {*} Cmp 视图组件
 * @param {MapStateToPropsParam<any, any, any>} [mapStateToProps] mapStateToProps
 * @param {MapDispatchToPropsParam<any, any>} [mapDispatchToProps] mapDispatchToProps
 * @returns
 */
export function getConnectedCmp(
  Cmp: any,
  mapStateToProps?: MapStateToPropsParam<any, any, any>,
  mapDispatchToProps?: MapDispatchToPropsParam<any, any>
) {
  return connect(
    mapStateToProps || null,
    mapDispatchToProps || null,
    null,
    {
      context: MyContext,
    }
  )(Cmp);
}
