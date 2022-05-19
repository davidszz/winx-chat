import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import logger from '@logger';
import router from './router';

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'NOT_FOUND',
    message: 'Page Not Found',
  });
});

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
  });
}

startServer();
