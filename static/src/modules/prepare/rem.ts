/**
 * REM适配模块
 * @author VenDream
 * @since 2018-12-6
 */

// 屏幕100等分
export const REMSlice = 100;

// 视觉稿设计尺寸宽度[iPhone6]
export const UEWidth = 750 / 2;

// 最大宽度限制
export const MAX_WIDTH = 750;

// 模块初始化
export function init() {
  // 相关常量获取
  const docEl = document.documentElement;
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';

  // 重新计算fontSize
  function recalc() {
    const width = Math.min(docEl.clientWidth, MAX_WIDTH);
    const fontSize = REMSlice * (width / UEWidth);
    docEl.style.fontSize = `${fontSize}px`;
    docEl.style.maxWidth = `${MAX_WIDTH}px`;
  }

  recalc();

  // 窗口大小变化时重新计算fontSize
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
}
