/**
 * 公共辅助函数
 * @author VenDream
 * @since 2018-12-27
 */

import Message from 'components/common/message';
import MangaWorksDialog from 'components/dialogs/manga-works-dialog';
import IllustWorksDialog from 'components/dialogs/illust-works-dialog';
import IllustDetailDialog from 'components/dialogs/illust-detail-dialog';
import userProfileDetailDialog from 'components/dialogs/user-profile-detail-dialog';
import BookmarkIllustsDialog from 'components/dialogs/bookmark-illusts-dialog';

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
  IllustWorksDialog.show({
    id: userId,
    transitionClass: DIALOG_TRANSITION_CLASS,
  });
}

/**
 * 显示用户漫画作品弹窗
 *
 * @export
 * @param {string} userId 用户ID
 */
export function checkUserMangas(userId: string) {
  MangaWorksDialog.show({
    id: userId,
    transitionClass: DIALOG_TRANSITION_CLASS,
  });
}

/**
 * 显示用户收藏作品弹窗
 *
 * @export
 * @param {string} userId 用户ID
 */
export function checkBookmarkIllusts(userId: string) {
  BookmarkIllustsDialog.show({
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
  if (+illustId === 0) {
    Message.show({ type: 3, message: '无权限查看该作品' });
  }

  IllustDetailDialog.show({
    id: illustId,
    transitionClass: DIALOG_TRANSITION_CLASS,
  });
}
