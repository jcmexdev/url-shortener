import { Router } from 'express';
import { redirectUrl, shortUrl } from './url';

const configureRoutes = (router: Router): Router => {
  router.post('/api/v1/short', shortUrl);
  router.get('/:key', redirectUrl);
  return router;
};

export { configureRoutes };
