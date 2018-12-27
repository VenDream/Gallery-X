/**
 * 用户收藏插画
 * @author VenDream
 * @since 2018-12-27
 */

import { addIllust } from 'utils/action';
import { getUserBookmarkIllusts } from 'api/user';
import IllustWorks from './illust-works';
import Message from 'components/common/message';
import { checkBookmarkIllusts } from 'components/helpers/common';
import './user-works.less';
import './bookmark-illusts.less';

export default class BookmarkIllusts extends IllustWorks {
  // 标题说明
  caption: string = '收藏的插画 | 漫画';
  //  类名
  className: string = 'bookmark-illusts';
  // 查看更多弹窗
  checkMore: (userId: string) => void = checkBookmarkIllusts;

  // 获取用户漫画作品列表
  async fetchUserWorks() {
    const { step, maxBookmarkId } = this.state.reqOption;
    const { userId, previewMode } = this.props;

    try {
      this.setState({ isLoading: true });
      const resp = await getUserBookmarkIllusts(
        userId,
        // 预览模式下只取前6条数据进行展示
        previewMode ? 6 : step,
        maxBookmarkId
      );
      if (resp) {
        const illusts = resp.illusts as IllustModel[];
        const maxBookmarkId = resp.maxBookmarkId || '';
        const newWorks = this.state.works.concat(illusts);
        this.setState(prevState => ({
          ...prevState,
          isEnd: !!resp.isEnd,
          reqOption: { ...prevState.reqOption, maxBookmarkId },
          works: newWorks,
        }));
        addIllust(illusts);
      } else {
        Message.show({ type: 3, message: '用户收藏作品获取失败，请重试' });
      }
      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }
}
