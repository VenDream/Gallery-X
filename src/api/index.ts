/**
 * API接口定义
 * @author VenDream
 * @since 2018-8-15
 */

const globalConfig = window.__GALLERY_X_GLOBAL_CONFIG__;
const isDevMode = process.env.NODE_ENV === 'development';
const API_HOST = isDevMode ? '' : globalConfig.apiHost;
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
