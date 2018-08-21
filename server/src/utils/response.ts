/**
 * 通用response处理模块
 * @author VenDream
 * @since 2018-8-21
 */

/**
 * 处理Pixiv的请求结果
 *
 * @export
 * @param {Record<string, any>} response 请求响应
 * @returns
 */
export function handlePixivResp(response: Record<string, any>) {
  if (response.hasError || response.error) {
    return response.errors || response.error || response;
  } else {
    return response.response || response;
  }
}
