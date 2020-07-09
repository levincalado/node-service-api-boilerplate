const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');

const createControllerRoutes = require('src/core-libs/core/create-controller-routes');

const errorHandler = require('./middlewares/error-handler');
const routeMethodNotFound = require('./middlewares/route-method-not-found');

module.exports = ({
  config, containerMiddleware, loggerMiddleware,
}) => {
  const router = Router();
  router.use((containerMiddleware));

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression());

  const v1Router = Router();
  if (config.env !== 'production') {
    v1Router.use('/docs', require('./controllers/v1/DocsController'));
  }

  v1Router.use('/users', createControllerRoutes('controllers/v1/UsersController'));

  apiRouter.use('/v1', v1Router);

  router.use('/api', apiRouter);
  router.use(errorHandler);
  router.use(routeMethodNotFound);

  return router;
};
