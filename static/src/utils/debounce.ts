/**
 * 防抖工具函数
 *
 * @export
 * @param {Function} func 要执行的函数
 * @param {number} delay 延迟时间
 */
export default function debounce(func: (...args) => void, delay: number) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, delay);
  };
}
