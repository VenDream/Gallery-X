/**
 * 插画相关ACTION定义
 * @author VenDream
 * @since 2018-5-8
 */

import API from '../api';
import * as ajax from '../utils/ajax';
import { AnyAction, Dispatch } from 'redux';
import ACTIONS from '../constants/actions';
import MESSAGE from '../constants/message';
import Message from '../components/common/message';

export interface RankingIllustParams {
  /**
   * 分类
   */
  mode?: string;
  /**
   * 日期
   */
  date?: string;
  /**
   * 开始位置
   */
  start?: number;
  /**
   * 步长
   */
  step?: number;
}

/**
 * 获取插画排行榜
 *
 * @export
 * @param {RankingIllustParams} opts 查询参数
 */
export function getRankingIllusts(opts?: RankingIllustParams) {
  return async (dispatch: Dispatch<AnyAction, {}>, getState: any) => {
    try {
      // 请求数据中
      dispatch({ type: ACTIONS.GET_RANKING_ILLUST_ING });

      const api = API.get('RANKING');
      const resp = await ajax.get(api, { body: opts });
      const type = resp.isEnd
        ? ACTIONS.GET_RANKING_ILLUST_END
        : ACTIONS.GET_RANKING_ILLUST_SUCCESS;

      // 请求成功or请求完毕
      dispatch({ type, data: resp.illusts });
    } catch (e) {
      console.error(e);
      dispatch({ type: ACTIONS.GET_RANKING_ILLUST_FAIL });
      Message.show({ type: 3, message: MESSAGE.GET_RANKING_ILLUSTS_FAILED });
    }
  };
}
