/**
 * 应用数据模型声明
 * @author VenDream
 * @since 2018-5-3
 */

//  Pixiv用户模型
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

// Pixiv插画模型
interface IllustModel {
  /**
   * 插画ID
   */
  id: string;
  /**
   * 插画类型, illust: 插画， manga： 漫画
   */
  type: string;
  /**
   * 插画标题
   */
  title: string;
  /**
   * 插画标签
   */
  tags: string;
  /**
   * 插画原图宽度
   */
  width: number;
  /**
   * 插画原图高度
   */
  height: number;
  /**
   * 插画总预览数
   */
  totalView: number;
  /**
   * 插画总收藏数
   */
  totalBookmarked: number;
  /**
   * 插画创作日期
   */
  createDate: string;
  /**
   * 是否已收藏
   */
  isBookmarked: boolean;
  /**
   * 插画作者
   */
  user: {
    /**
     * ID
     */
    id: string;
    /**
     * 帐号
     */
    account: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 昵称
     */
    name: string;
    /**
     * 是否已关注
     */
    isFollowed: boolean;
  };
  /**
   * 插画图片源
   */
  imageUrls: Array<{
    /**
     * 中尺寸
     */
    medium: string;
    /**
     * 大尺寸
     */
    large: string;
    /**
     * 原图
     */
    original: string;
  }>;
}
