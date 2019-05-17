/**
 * REM适配模块
 * @author VenDream
 * @since 2019-5-17
 */

// 屏幕100等分
export const REMSlice = 100;

// 视觉稿设计尺寸宽度[iPhone6]
export const UEWidth = 750 / 2;

// 模块初始化
export function init() {
  // 相关常量获取
  const docEl = document.documentElement;
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';

  // 屏幕自适应
  function autofit() {
    const isMobile = 'ontouchstart' in document;
    const autoFiter = isMobile ? autofitForMobile : autofitForPC;
    autoFiter();
  }

  // 移动端自适应
  function autofitForMobile() {
    const MAX_WIDTH = 750;
    // 宽度优先
    const width = Math.min(docEl.clientWidth, MAX_WIDTH);
    // 设定根节点fontSize
    const fontSize = REMSlice * (width / UEWidth);
    docEl.style.fontSize = `${fontSize}px`;
    // 设定最大宽度
    docEl.style.maxWidth = `${MAX_WIDTH}px`;
  }

  // PC端自适应
  function autofitForPC() {
    // 大小限制(对标iPhone6/7/8)
    const MAX_WIDTH = 375 * 1.5;
    const MAX_HEIGHT = 667 * 1.5;
    // 宽高比
    const RATIO = MAX_WIDTH / MAX_HEIGHT;
    // 高度优先
    const height = Math.min(docEl.clientHeight, MAX_HEIGHT);
    const width = height * RATIO;
    const fontSize = REMSlice * (width / UEWidth);
    // 设定根节点fontSize
    docEl.style.fontSize = `${fontSize}px`;
    // 按比例设定最大宽高
    docEl.style.maxWidth = `${width}px`;
    docEl.style.maxHeight = `${height}px`;
  }

  autofit();

  // 窗口大小变化时重新计算fontSize
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, autofit, false);
}
