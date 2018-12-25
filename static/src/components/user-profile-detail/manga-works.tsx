/**
 * 用户漫画作品
 * @author VenDream
 * @since 2018-12-25
 */

import { addIllust } from 'utils/action';
import { getUserMangas } from 'api/user';
import IllustWorks from './illust-works';
import Message from 'components/common/message';
import { checkUserMangas } from 'components/helpers/common';
import './user-works.less';
import './manga-works.less';

export default class MangaWorks extends IllustWorks {
  // 标题说明
  caption: string = '漫画作品';
  //  类名
  className: string = 'manga-works';
  // 查看更多弹窗
  checkMore: (userId: string) => void = checkUserMangas;

  // 获取用户漫画作品列表
  async fetchUserWorks() {
    const { start, step } = this.state.reqOption;
    const { userId, previewMode } = this.props;
    // 预览模式下只取前6条数据进行展示
    let reqOpt = { start, step };
    if (previewMode) reqOpt = { start: 0, step: 6 };

    try {
      this.setState({ isLoading: true });
      const resp = await getUserMangas(userId, reqOpt.start, reqOpt.step);
      if (resp) {
        const mangas = resp.mangas as IllustModel[];
        const newWorks = this.state.works.concat(mangas);
        this.setState(prevState => ({
          ...prevState,
          isEnd: !!resp.isEnd,
          reqOption: { ...prevState.reqOption, start: newWorks.length },
          works: newWorks,
        }));
        addIllust(mangas);
      } else {
        Message.show({ type: 3, message: '用户作品获取失败，请重试' });
      }
      this.setState({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }
}
