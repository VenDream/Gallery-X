/**
 * 应用数据模型声明
 * @author VenDream
 * @since 2018-3-19
 */

interface UserModel {
  /**
   * 用户id
   */
  id: string;
  /**
   * 账号名
   */
  account: string;
  /**
   * 昵称
   */
  name: string;
  /**
   * 限制等级
   */
  xRestrict: number;
  /**
   * 邮箱
   */
  mailAddress: '';
  /**
   * 是否高级账号
   */
  isPremium: boolean;
  /**
   * 邮箱是否已验证
   */
  isMailAuthorized: boolean;
  /**
   * 用户头像
   */
  profileImageUrls: {
    /**
     * 小尺寸
     */
    px_16x16: string;
    /**
     * 中尺寸
     */
    px_50x50: string;
    /**
     * 大尺寸
     */
    px_170x170: string;
  } | null;
  /**
   * 其他属性
   */
  [key: string]: any;
}
