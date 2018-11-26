/**
 * API接口定义
 * @author VenDream
 * @since 2018-11-26
 */

const apiMap = {
  USER_INFO: '/api/user/info',
  USER_LOGIN: '/api/user/login',
  USER_LOGOUT: '/api/user/logout',
  USER_FOLLOW: '/api/user/follow',
  USER_UNFOLLOW: '/api/user/unfollow',
  USER_ILLUSTS: '/api/user/illusts',
  ILLUST_LIKE: '/api/illust/like',
  ILLUST_UNLIKE: '/api/illust/unlike',
  ILLUST_RANKING: '/api/illust/ranking',
  ILLUST_SEARCH: '/api/illust/search',
};

export default {
  get: (apiName: string): string => {
    return apiMap[apiName] || '';
  },
};
