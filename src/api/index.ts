/**
 * API接口定义
 * @author VenDream
 * @since 2018-6-27
 */

const API_HOST = 'http://43.239.159.171:8080';
const API_MAP = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  RANKING: 'ranking',
  SEARCH: 'search',
  GET_USER_INFO: 'get_user_info',
};

export default {
  get: (apiName: string) => {
    const API_ITEM = API_MAP[apiName];
    if (!API_ITEM) {
      return null;
    }

    return `${API_HOST}/api/${API_ITEM}`;
  },
};
