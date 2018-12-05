/**
 * 应用全局类型声明
 * @author VenDream
 * @since 2018-9-12
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

// 个人资料隐私策略
type ProfilePublicity = 'public' | 'mypixiv' | 'private';
// Pixiv个人资料详情数据模型
interface UserProfileDetailModel {
  // 用户信息
  user: {
    /**
     * 用户id
     */
    id: string;
    /**
     * 昵称
     */
    name: string;
    /**
     * 账号名
     */
    account: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 一句话描述
     */
    comment: string;
    /**
     * 是否已关注
     */
    isFollowed: boolean;
    /**
     * 扩展属性
     */
    [key: string]: any;
  };
  // 个人资料
  profile: {
    /**
     * 个人主页
     */
    webpage: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 出生年月日
     */
    birth: string;
    /**
     * 出生月日
     */
    birthDay: string;
    /**
     * 出生年份
     */
    birthYear: string;
    /**
     * 地址
     */
    region: string;
    /**
     * 国家id
     */
    addressId: string;
    /**
     * 国家代码
     */
    countryCode: string;
    /**
     * 职业
     */
    job: string;
    /**
     * 职业id
     */
    jobId: string;
    /**
     * 总关注人数
     */
    totalFollowUsers: number;
    /**
     * 好P友总数
     */
    totalMypixivUsers: number;
    /**
     * 插画作品总数
     */
    totalIllusts: number;
    /**
     * 漫画作品总数
     */
    totalManga: number;
    /**
     * 小说作品总数
     */
    totalNovels: number;
    /**
     * (公开的)收藏插画总数
     */
    totalIllustBookmarksPublic: number;
    /**
     * 插画系列作品总数
     */
    totalIllustSeries: number;
    /**
     * 背景图片
     */
    backgroundImageUrl: string;
    /**
     * twitter账号
     */
    twitterAccount: string;
    /**
     * twitter地址
     */
    twitterUrl: string;
    /**
     * pawoo地址
     */
    pawooUrl: string;
    /**
     * 是否高级会员
     */
    isPremium: boolean;
    /**
     * 是否使用自定义背景图片
     */
    isUsingCustomProfileImage: boolean;
  };
  // 个人资料隐私策略，私人 | 仅好P友可见 | 所有人可见
  profilePublicity: {
    gender: ProfilePublicity;
    region: ProfilePublicity;
    birthDay: ProfilePublicity;
    birthYear: ProfilePublicity;
    job: ProfilePublicity;
    pawoo: boolean;
  };
  // 工作环境
  workspace: {
    /**
     * 电脑
     */
    pc: string;
    /**
     * 显示器
     */
    monitor: number;
    /**
     * 软件
     */
    tool: string;
    /**
     * 扫描仪
     */
    scanner: string;
    /**
     * 数位板
     */
    tablet: string;
    /**
     * 鼠标
     */
    mouse: string;
    /**
     * 打印机
     */
    printer: string;
    /**
     * 桌子上的东西
     */
    desktop: string;
    /**
     * 绘画时所听的音乐
     */
    music: string;
    /**
     * 桌子
     */
    desk: string;
    /**
     * 椅子
     */
    chair: string;
    /**
     * 其他
     */
    comment: string;
    /**
     * 工作环境背景图片
     */
    workspaceImageUrl: string | null;
  };
}

/**
 * 插画基础数据模型
 */
interface IllustBaseModel {
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

// Pixiv插画数据模型
interface IllustModel extends IllustBaseModel {
  /**
   * 插画作者
   */
  user: ArtistModel;
}

// Pixiv画师数据模型
interface ArtistModel {
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
   * 搜索排序: 从新到旧，从旧到新或者按热度从高到低
   */
  sort?: 'date_desc' | 'date_asc' | 'popular_desc';
  /**
   * 搜索对象: 标签部分匹配，标签完全匹配或标题描述匹配
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
