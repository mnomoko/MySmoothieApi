import smoothiesRouter from './api/controllers/v1/smoothies/router';
import fruitsRouter from './api/controllers/v1/fruits/router';

export default function routes(app) {
  app.use('/api/v1/smoothies', smoothiesRouter);
  app.use('/api/v1/fruits', fruitsRouter);
}
