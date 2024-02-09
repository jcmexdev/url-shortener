import express from 'express';
import { configureRoutes } from './infrastructure/rest';
import {
  logError,
  responseError,
  response404,
} from './infrastructure/rest/error';

const app = express();
const APP_PORT: number = 8000;

app.use(express.json());

const router = configureRoutes(express.Router());
app.use(router);
app.use(response404);
app.use(logError);
app.use(responseError);

app.listen(APP_PORT, () => {
  console.log(`listening on http://127.0.0.1:${APP_PORT}`);
});
