import { WebSocketServer } from '@core/websocket';

declare module 'express-serve-static-core' {
  interface Request extends Express.Request {
    wss: WebSocketServer;
    rateLimit?: {
      limit: number;
      current: number;
      remaining: number;
      resetTime: Date;
    };
    context?: {
      userId?: string;
    };
  }
}

export {};
