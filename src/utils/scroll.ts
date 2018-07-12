/**
 * 缓动滚动到指定位置
 *
 * @export
 * @param {Element} elem 滚动元素
 * @param {number} to 滚动终点高度
 * @param {number} duration 动画时长
 */
export function scrollTo(elem: Element, to: number, duration: number) {
  const start = elem.scrollTop;
  const change = to - start;
  let currTime = 0;
  const increment = 15;

  // 缓动函数
  (Math as any).easeInOutQuad = function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  // 动画细节
  function animateScroll() {
    currTime += increment;
    const val = (Math as any).easeInOutQuad(currTime, start, change, duration);
    elem.scrollTop = Math.max(0, val);

    if (currTime < duration) {
      setTimeout(animateScroll, increment);
    }
  }

  animateScroll();
}
