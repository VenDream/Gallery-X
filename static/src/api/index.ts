/**
 * API接口定义
 * @author VenDream
 * @since 2018-8-16
 */

const apiMap = {
  USER_INFO: '/api/user/info',
  USER_LOGIN: '/api/user/login',
  USER_LOGOUT: '/api/user/logout',
  ILLUST_RANKING: '/api/illust/ranking',
  ILLUST_SEARCH: '/api/illust/search',
};

export default {
  get: (apiName: string) => {
    return apiMap[apiName] || null;
  },
};
