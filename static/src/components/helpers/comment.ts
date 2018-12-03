/**
 * 插画评论相关辅助函数
 * @author VenDream
 * @since 2018-11-30
 */

import ReactHtmlParser from 'react-html-parser';
import { getEmojiImageUrl } from 'utils/emoji';

/**
 * 解析评论文本，处理换行符和表情，返回react节点
 *
 * @export
 * @param {string} commentStr 评论文本
 */
export function parseCommentStr(commentStr: string): JSX.Element {
  let htmlStr = commentStr.replace(/\n/g, '<br/>');
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
