/**
 * 插画排行榜查询条件
 */
interface RankingIllustParams {
  /**
   * 分类
   */
  mode?: string;
  /**
   * 日期
   */
  date?: string;
  /**
   * 开始位置
   */
  start?: number;
  /**
   * 步长
   */
  step?: number;
}

/**
 * Pixiv登陆参数
 */
interface LoginParams {
  /**
   * 账号（PixivID或邮箱）
   */
  account: string;
  /**
   * 密码
   */
  password: string;
}
