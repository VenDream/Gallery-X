import moment from 'moment';

/**
 * 默认排行榜参数
 */
export const defaultRankingFilter = (() => {
  const now = moment();
  const hours = moment().hours();
  // @NOTE：对于Pixiv来说，若当前时间处于早上11之前，取两天前数据，否则取一天前的数据
  const date = now.subtract(hours < 11 ? 2 : 1, 'days');

  const filter: RankingFilter = {
    mode: 'day',
    date: date.format('YYYY-MM-DD'),
    start: 0,
    step: 30,
  };
  return filter;
})();

/**
 * 默认搜索参数
 */
export const defaultSearchFilter = (() => {
  const filter: SearchFilter = {
    word: '',
    sort: 'date_desc',
    target: 'partial_match_for_tags',
    duration: 'within_last_day',
    start: 0,
    step: 30,
  };
  return filter;
})();
