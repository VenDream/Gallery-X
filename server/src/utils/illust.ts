/**
 * 插画数据处理工具函数
 * @author VenDream
 * @since 2018-9-13
 */

import { getProxyImageUrl } from './common';

/**
 * 获取排行榜请求接口参数
 *
 * @export
 * @param {RankingFilter} filter 前端传入的参数
 * @returns {RankingParams}
 */
export function getRankingParams(filter: RankingFilter): RankingParams {
  const { start, step, ...restParams } = filter;
  return {
    ...restParams,
    offset: start || 0,
    filter: 'for_ios',
  };
}

/**
 * 获取搜索请求接口参数
 *
 * @export
 * @param {SearchFilter} filter 前端传入的参数
 */
export function getSearchParams(filter: SearchFilter): SearchParams {
  const { start, target, step, startDate, endDate, ...restParams } = filter;
  const params: SearchParams = {
    ...restParams,
    offset: start || 0,
    filter: 'for_ios',
    search_target: target,
  };
  // 附加日期范围
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  return params;
}

/**
 * 解析接口返回的插画数据
 *
 * @export
 * @param {Record<string, any>} illusts 插画数据
 * @returns {IllustModel[]}
 */
export function getParsedIllusts(
  illusts: Array<Record<string, any>>
): IllustModel[] {
  const paredIllusts: IllustModel[] = [];

  try {
    for (const illust of illusts) {
      const {
        id, // id
        type, // 插画类型
        title, // 名称
        caption, // 说明
        imageUrls, // 封面图片
        user, // 作者
        tags, // 标签
        tools, // 作画软件
        createDate, // 创作日期
        pageCount, // 图片总数
        width, // 原图宽度
        height, // 原图高度
        metaSinglePage, // 原图图片(只有一张图片时)
        metaPages, // 原图图片集(有多张图片时)
        totalView, // 总浏览量
        totalBookmarks, // 总收藏数
        isBookmarked, // 是否收藏
      } = illust;

      // 处理图片地址
      let images = [];
      const isMultiple = pageCount > 1;
      const preProcessImages: Array<Record<string, string>> = isMultiple
        ? metaPages.map((metaPage: Record<string, any>) => metaPage.imageUrls)
        : [
            {
              ...imageUrls,
              original: metaSinglePage.originalImageUrl,
            },
          ];
      images = preProcessImages.map((image: Record<string, string>) => ({
        medium: getProxyImageUrl(image.medium),
        large: getProxyImageUrl(image.large),
        original: getProxyImageUrl(image.original),
      }));

      // 处理作者的头像图片
      const { profileImageUrls, ...restInfo } = user;
      const author = {
        ...restInfo,
        avatar: getProxyImageUrl(profileImageUrls.medium),
      };

      // 处理作品标签
      const tagsStr: string = tags
        .map((tag: Record<string, string>) => tag.name)
        .join(';');

      paredIllusts.push({
        id,
        type,
        title,
        caption,
        imageUrls: images,
        user: author,
        tags: tagsStr,
        tools,
        createDate,
        width,
        height,
        pageCount,
        totalView,
        totalBookmarks,
        isBookmarked,
      });
    }

    return paredIllusts;
  } catch (err) {
    throw new Error(err.message || err);
  }
}

/**
 * 解析接口返回的评论数据
 *
 * @export
 * @param {Array<Record<string, any>>} comments 评论数据
 * @returns {CommentModel[]}
 */
export function getParsedComments(
  comments: Array<Record<string, any>>
): CommentModel[] {
  const parsedComments: CommentModel[] = [];

  try {
    for (const comment of comments) {
      const { id, comment: content, date, user, hasReplies } = comment;
      const avatar = user.profileImageUrls.medium;

      parsedComments.push({
        id,
        comment: content,
        date,
        user: {
          id: user.id,
          name: user.name,
          account: user.account,
          avatar: getProxyImageUrl(avatar),
        },
        hasReplies,
      });
    }

    return parsedComments;
  } catch (err) {
    throw new Error(err.message || err);
  }
}
