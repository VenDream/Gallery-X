/**
 * 公共辅助函数
 * @author VenDream
 * @since 2018-12-25
 */

import illustWorksDialog from 'components/dialogs/illust-works-dialog';
import illustDetailDialog from 'components/dialogs/illust-detail-dialog';
import userProfileDetailDialog from 'components/dialogs/user-profile-detail-dialog';

const DIALOG_TRANSITION_CLASS = 'fade-in-right';

/**
 * 显示用户个人资料弹窗
 *
 * @export
 * @param {string} userId 用户ID
 */
export function checkUserDetail(userId: string) {
  userProfileDetailDialog.show({
    id: userId,
    transitionClass: DIALOG_TRANSITION_CLASS,
  });
}

/**
 * 显示用户插画作品弹窗
 *
 * @export
 * @param {string} userId 用户ID
 */
export function checkUserIllusts(userId: string) {
  illustWorksDialog.show({
    id: userId,
    transitionClass: DIALOG_TRANSITION_CLASS,
  });
}

/**
 * 显示插画详情弹窗
 *
 * @export
 * @param {string} illustId 插画ID
 */
export function checkIllustDetail(illustId: string) {
  illustDetailDialog.show({
    id: illustId,
    transitionClass: DIALOG_TRANSITION_CLASS,
  });
}
