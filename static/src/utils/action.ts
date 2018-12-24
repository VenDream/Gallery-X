/**
 * action辅助函数，服务于不需要container连接但是需要触发action的组件
 * @author VenDream
 * @since 2018-12-24
 */

import store from 'store';
import * as IllustActions from 'actions/illust';

/**
 * 添加插画
 *
 * @export
 * @param {IllustModel[]} illusts 插画数据
 */
export function addIllust(illusts: IllustModel[]) {
  store.dispatch(IllustActions.addIllustSync(illusts));
}
