/**
 * 搜索条件
 * @author VenDream
 * @since 2018-9-12
 */

export default {
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

const ALL_SORTS = ['date_desc', 'date_asc'];
const ALL_TARGETS = [
  'partial_match_for_tags',
  'exact_match_for_tags',
  'title_and_caption',
];

export { ALL_SORTS, ALL_TARGETS };
