/**
 * 应用配置类型声明
 * @author VenDream
 * @since 2018-8-15
 */

interface GlobalConfig {
  /**
   * 远程API接口
   */
  apiHost: string;
  /**
   * 开发环境配置
   */
  devServer: {
    /**
     * 本地运行host
     */
    host: string;
    /**
     * 本地运行端口
     */
    port: number;
  };
}
