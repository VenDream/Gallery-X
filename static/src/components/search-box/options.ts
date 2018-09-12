/**
 * 搜索条件
 * @author VenDream
 * @since 2018-9-12
 */

import store from 'store';

function getSearchFilterOptions() {
  const user = store.getState().user;
  const options = {
    sort: [
      {
        key: 'date_desc',
        value: '从新到旧',
      },
      {
        key: 'date_asc',
        value: '从旧到新',
      },
    ],
    target: [
      {
        key: 'partial_match_for_tags',
        value: '部分匹配',
      },
      {
        key: 'exact_match_for_tags',
        value: '完全匹配',
      },
      {
        key: 'title_and_caption',
        value: '标题|简介',
      },
    ],
  };

  // 高级用户可以选择按热度排序
  if (user.isPremium) {
    options.sort.splice(1, 0, { key: 'popular_desc', value: '人气热度' });
  }

  return options;
}

export default getSearchFilterOptions();
