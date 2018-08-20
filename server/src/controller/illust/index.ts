/**
 * 插画相关路由
 * @author VenDream
 * @since 2018-8-20
 */

import Router from 'koa-router';
import IllustRouter from './illust';

const apiRouter = new Router();
apiRouter.use('/api/illust', IllustRouter);

export default apiRouter;
