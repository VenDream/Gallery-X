/**
 * 插画表情贴图模块
 * @author VenDream
 * @since 2018-11-30
 */

// pixiv图片代理服务器
const PROXY_HOST = window.__PIXIV_PROXY_HOST__ || '';
// emoji
const EMOJI_URI = 'https://s.pximg.net/common/images/emoji/[id].png';

// emoji映射表
const EMOJIS = {
  normal: 101,
  surprise: 102,
  serious: 103,
  heaven: 104,
  happy: 105,
  excited: 106,
  sing: 107,
  cry: 108,
  normal2: 201,
  shame2: 202,
  love2: 203,
  interesting2: 204,
  blush2: 205,
  fire2: 206,
  angry2: 207,
  shine2: 208,
  panic2: 209,
  normal3: 301,
  satisfaction3: 302,
  surprise3: 303,
  smile3: 304,
  shock3: 305,
  gaze3: 306,
  wink3: 307,
  happy3: 308,
  excited3: 309,
  love3: 310,
  normal4: 401,
  surprise4: 402,
  serious4: 403,
  love4: 404,
  shine4: 405,
  sweat4: 406,
  shame4: 407,
  sleep4: 408,
  heart: 501,
  teardrop: 502,
  star: 503,
};

/**
 * 根据key获取表情贴图地址
 *
 * @export
 * @param {string} key key
 */
export function getEmojiImageUrl(key: string) {
  const id = EMOJIS[key] || 0;
  if (!id || !PROXY_HOST) return '';

  const url = EMOJI_URI.replace('[id]', id);
  return `${PROXY_HOST}?url=${url}`;
}
