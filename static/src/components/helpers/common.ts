/**
 * 公共辅助函数
 * @author VenDream
 * @since 2018-12-24
 */

import illustWorksDialog from 'components/dialogs/illust-works-dialog';
import illustDetailDialog from 'components/dialogs/illust-detail-dialog';

/**
 * 显示用户插画作品弹窗
 *
 * @export
 * @param {string} userId 用户ID
 */
export function checkUserIllusts(userId: string) {
  illustWorksDialog.show({ id: userId, transitionClass: 'fade-in-right' });
}

/**
 * 显示插画详情弹窗
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function checkIllustDetail(illustId: string) {
  illustDetailDialog.show({ id: illustId, transitionClass: 'fade-in-right' });
}
