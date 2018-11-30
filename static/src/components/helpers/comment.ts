/**
 * 插画评论相关辅助函数
 * @author VenDream
 * @since 2018-11-30
 */

import ReactHtmlParser from 'react-html-parser';

/**
 * 解析评论文本，处理换行符和表情，返回react节点
 *
 * @export
 * @param {string} commentStr 评论文本
 */
export function parseCommentStr(commentStr: string): JSX.Element {
  const htmlStr = commentStr.replace(/\n/g, '<br/>');
  return ReactHtmlParser(htmlStr);
}
