/**
 * 应用全局类型声明
 * @author VenDream
 * @since 2018-8-21
 */

// Pixiv用户数据模型
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

// Pixiv插画数据模型
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
   * 插画说明
   */
  caption: string;
  /**
   * 插画标签
   */
  tags: string;
  /**
   * 作画软件
   */
  tools: string[];
  /**
   * 插画原图宽度
   */
  width: number;
  /**
   * 插画原图高度
   */
  height: number;
  /**
   * 插画总页数
   */
  pageCount: number;
  /**
   * 插画总预览数
   */
  totalView: number;
  /**
   * 插画总收藏数
   */
  totalBookmarks: number;
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

// Pixiv插画评论数据模型
interface CommentModel {
  /**
   * 评论ID
   */
  id: string;
  /**
   * 评论内容
   */
  comment: string;
  /**
   * 评论日期
   */
  date: string;
  /**
   * 评论用户
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
  };
  /**
   * 是否有回复
   */
  hasReplies: boolean;
}

// Pixiv排行榜筛选参数
interface RankingFilter {
  /**
   * 模式，按照日期，性取向和类型进行组合
   */
  mode?:
    | 'day'
    | 'week'
    | 'month'
    | 'day_male'
    | 'day_female'
    | 'week_original'
    | 'week_rookie'
    | 'day_r18'
    | 'day_male_r18'
    | 'day_female_r18'
    | 'week_r18'
    | 'week_r18g';
  /**
   * 日期，当模式组合为day前缀时生效
   */
  date?: string;
  /**
   * 开始位置
   */
  start?: number;
  /**
   * 分页大小
   */
  step?: number;
}

// Pixiv搜索筛选参数
interface SearchFilter {
  /**
   * 搜索关键词
   */
  word: string;
  /**
   * 结果排序，从新到旧或从旧到新
   */
  sort?: 'date_desc' | 'date_asc';
  /**
   * 匹配规则，分为模糊匹配，精确匹配和标题描述
   */
  target?:
    | 'partial_match_for_tags'
    | 'exact_match_for_tags'
    | 'title_and_caption';
  /**
   * 起始日期(YYYY-MM-DD)
   */
  startDate?: string;
  /**
   * 终止日期(YYYY-MM-DD)
   */
  endDate?: string;
  /**
   * 开始位置
   */
  start?: number;
  /**
   * 分页大小
   */
  step?: number;
}
