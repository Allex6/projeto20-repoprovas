import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import usersRouter from './lib/routers/usersRouter';
import testsRouter from './lib/routers/testsRouter';
import errorHandler from './lib/middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/tests', testsRouter);

app.use(errorHandler);

export default app;