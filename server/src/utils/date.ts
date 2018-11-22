/**
 * 常用时间日期工具函数
 * @author VenDream
 * @since 2018-11-22
 */

/**
 * 获取从现在起n秒后的时间
 *
 * @export
 * @param {number} n 秒数
 */
export function getDateAfterSeconds(n: number) {
  const now = new Date();
  return new Date(now.setSeconds(now.getSeconds() + n));
}

/**
 * 获取指定时间相关信息
 *
 * @export
 * @param {Date} [date] 时间
 */
export function getDateTimeInfo(date?: Date) {
  const dateTime = date || new Date();
  const padZero = (n: number) => (n >= 10 ? `${n}` : `0${n}`);
  const [YY, MM, DD, HH, mm, ss] = [
    dateTime.getFullYear(),
    dateTime.getMonth() + 1,
    dateTime.getDate(),
    dateTime.getHours(),
    dateTime.getMinutes(),
    dateTime.getSeconds(),
  ];
  const [YYStr, MMStr, DDStr] = [YY, MM, DD].map(n => padZero(n));
  const [HHStr, mmStr, ssStr] = [HH, mm, ss].map(n => padZero(n));

  return {
    date: dateTime,
    timeStamp: dateTime.getTime(),
    timePart: { YY, MM, DD, HH, mm, ss },
    timeStr: `${YYStr}-${MMStr}-${DDStr} ${HHStr}:${mmStr}:${ssStr}`,
  };
}
