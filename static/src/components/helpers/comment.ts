/**
 * 插画评论相关辅助函数
 * @author VenDream
 * @since 2018-12-19
 */

import ReactHtmlParser from 'react-html-parser';
import { getEmojiImageUrl } from 'utils/emoji';

/**
 * 解析评论文本，处理特殊字符和URL
 *
 * @export
 * @param {string} commentStr 评论文本
 */
export function parseCommentStr(commentStr: string): JSX.Element {
  // 替换url为a标签
  let htmlStr = commentStr.replace(
    /(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
    ($0, url) => `<a href=${url} target="_blank">${url}</a>`
  );
  // 替换换行符为br标签
  htmlStr = htmlStr.replace(/(\r)?\n/g, '<br/>');
  // 解析emoji的key
  htmlStr = htmlStr.replace(/(\([a-zA-Z0-9]+\))/g, ($0, key) => {
    const emojiKey = key.replace(/[\(|\)]/g, '');
    const emojiUrl = getEmojiImageUrl(emojiKey);
    return emojiUrl
      ? `<img class="emoji emoji-${emojiKey}" src="${emojiUrl}">`
      : key;
  });

  return ReactHtmlParser(htmlStr);
}
