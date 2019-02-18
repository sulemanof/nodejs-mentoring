import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();
app.use(cookieParser());

app.use('/', router);

export default app;
