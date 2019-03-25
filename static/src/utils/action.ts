/**
 * action辅助函数，服务于不需要container连接但是需要触发action的组件
 * @author VenDream
 * @since 2019-3-25
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

/**
 * 设置当前正在查看的插画
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function setActiveIllust(illustId: string) {
  store.dispatch(IllustActions.setActiveIllustSync(illustId));
}
