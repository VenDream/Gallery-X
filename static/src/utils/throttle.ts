/**
 * 节流工具函数
 *
 * @export
 * @param {Function} func 要执行的函数
 * @param {number} threshold 要控制的执行间隔
 */
export default function throttle(func: (...args) => void, threshold: number) {
  let last = null;
  let timer = null;

  return (...args) => {
    const now = +new Date();

    if (last && now - last < threshold) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        func(...args);
      }, threshold);
    } else {
      last = now;
      func(...args);
    }
  };
}
