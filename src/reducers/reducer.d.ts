/**
 * App state
 */
interface AppState {
  /**
   * 当前页面
   */
  page: string;
  /**
   * 当前插画分类
   */
  category: string;
}

/**
 * 用户 state
 */
type UserState = UserModel;

/**
 * 布局 state
 */
interface LayoutState {
  /**
   * 应用是否已初始化
   */
  inited: boolean;
  /**
   * 是否显示应用初始化的loading蒙层
   */
  initLoadingVisible: boolean;
}

/**
 * 插画 state
 */
interface IllustState {
  /**
   * 具体的插画对象
   */
  byId: Record<string, IllustModel>;
  /**
   * 插画引用集合
   */
  ids: string[];
  /**
   * 当前激活的插画Id
   */
  activeId: string;
  /**
   * 状态 0: 就绪，1: 加载中，2: 加载失败 3: 加载完毕
   */
  status: number;
  /**
   * 排行榜筛选参数
   */
  rankingFilter: RankingFilter;
  /**
   * 搜索参数
   */
  searchFilter: SearchFilter;
}

/**
 * Store全局状态
 */
interface StoreState {
  app: AppState;
  user: UserState;
  illust: IllustState;
  layout: LayoutState;
}
