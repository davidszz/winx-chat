declare module 'express-serve-static-core' {
  interface Request extends Express.Request {
    context?: {
      userId?: string;
    };
  }
}

export {};
