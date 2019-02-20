import examplesRouter from './api/controllers/examples/router';
import smoothiesRouter from './api/controllers/smoothies/router';
import fruitsRouter from './api/controllers/fruits/router';

export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/smoothies', smoothiesRouter);
  app.use('/api/v1/fruits', fruitsRouter);
}
