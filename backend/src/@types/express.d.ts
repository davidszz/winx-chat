import { WebSocketServer } from '@core/websocket';

declare module 'express-serve-static-core' {
  interface Request extends Express.Request {
    wss: WebSocketServer;
    context?: {
      userId?: string;
    };
  }
}

export {};
