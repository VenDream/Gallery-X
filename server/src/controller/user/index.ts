/**
 * 用户相关路由
 * @author VenDream
 * @since 2018-8-16
 */

import Router from 'koa-router';
import UserRouter from './user';

const apiRouter = new Router();
apiRouter.use('/api/user', UserRouter);

export default apiRouter;
