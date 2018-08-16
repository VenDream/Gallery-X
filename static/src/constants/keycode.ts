/**
 * 键盘keyCode映射表
 * @author VenDream
 * @since 2018-6-27
 */

interface KeyCode {
  [prop: string]: number | null;
}

const KEY_CODES: KeyCode = {
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,

  LEFT: 37,
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,

  NUM0: 48,
  NUM1: 49,
  NUM2: 50,
  NUM3: 51,
  NUM4: 52,
  NUM5: 53,
  NUM6: 54,
  NUM7: 55,
  NUM8: 56,
  NUM9: 57,

  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,

  BACKSPACE: 8,
  TAB: 9,
  CAPSLOCK: 20,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  META: 91,

  ESC: 27,
  ENTER: 13,
  SPACE: 32,
  DELETE: 46,
  PAGEUP: 33,
  PAGEDOWN: 34,
  END: 35,
  HOME: 36,

  PLUS: 187,
  MINUS: 189,
};

export default KEY_CODES;
