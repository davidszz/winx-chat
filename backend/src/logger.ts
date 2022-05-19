import pino from 'pino';

export default pino({
  level: process.env.PINO_DEBUG_LEVEL ?? 'info',
});
