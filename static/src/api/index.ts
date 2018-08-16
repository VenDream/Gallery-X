/**
 * API接口定义
 * @author VenDream
 * @since 2018-8-16
 */

const apiMap = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  RANKING: 'ranking',
  SEARCH: 'search',
  GET_USER_INFO: '/user/info',
};

export default {
  get: (apiName: string) => {
    const apiPath = apiMap[apiName];
    if (!apiPath) {
      return null;
    }
    return `/api/${apiPath}`;
  },
};
