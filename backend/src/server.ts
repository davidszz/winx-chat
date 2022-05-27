import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { WebSocketServer } from '@core/websocket';
import logger from '@logger';

import router from './router';

const PORT = process.env.PORT ?? 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/socket' });

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.wss = wss;
  next();
});
app.use(router);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'NOT_FOUND',
    message: 'Page Not Found',
  });
});

async function startServer(): Promise<void> {
  await mongoose.connect(process.env.MONGODB_URI);
  server.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
  });
}

startServer();
