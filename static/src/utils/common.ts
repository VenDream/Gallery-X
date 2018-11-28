/**
 * 常用公用方法
 * @author VenDream
 * @since 2018-11-28
 */

/**
 * 生成指定长度的唯一ID
 *
 * @export
 * @param {number} n ID长度
 */
export function getUniqueId(n: number) {
  let ID = '';
  while (ID.length < n) {
    ID += Math.random()
      .toString(36)
      .substr(2);
  }

  return ID.substr(0, n);
}

/**
 * 检查一个DOM节点是否在当前视口内
 * @param   {HTMLElement} node      DOM节点
 * @param   {HTMLElement} container 容器
 * @returns {Bool}                  返回检查结果
 */
export function checkInViewport(node: HTMLElement, container?: HTMLElement) {
  const doc =
    container || document.scrollingElement || document.documentElement;
  const docViewTop = doc.scrollTop;
  const docViewBottom =
    docViewTop + document.body.getBoundingClientRect().height;
  const nodeTop = node.offsetTop;
  const nodeBottom = nodeTop + node.getBoundingClientRect().height;

  return nodeBottom <= docViewBottom && docViewTop <= nodeTop;
}

/**
 * 判断当前环境是否为移动端
 *
 * @export
 */
export function isMobile() {
  return 'ontouchstart' in window;
}
